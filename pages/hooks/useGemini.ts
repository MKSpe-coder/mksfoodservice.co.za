import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { mksData } from '../../data/mksContent';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Generate a concise context for the model
const generateSystemContext = (products: Product[]) => {
  const companyInfo = {
    name: mksData.companyName,
    tagline: mksData.tagline,
    about: mksData.aboutUs.short,
    contact: mksData.contactInfo,
    services: mksData.services.map(s => s.name),
    brands: mksData.brandPartners?.map(b => b.name)
  };

  const productInfo = products.map(p => ({
    id: p.id,
    name: p.name,
    category: mksData.productCategories.find(c => c.id === p.categoryId)?.name || 'General',
    brand: p.brandName,
  }));

  const context = `
    Company Information: ${JSON.stringify(companyInfo, null, 2)}
    Product Catalog (name, id, category, brand): ${JSON.stringify(productInfo, null, 2)}
  `;

  return context;
};


export const useGemini = () => {
  const { products, isLoading: productsLoading } = useProducts(); // get products from context
  const [systemInstruction, setSystemInstruction] = useState<string>('');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am the MKS AI Assistant. How can I help you find the perfect kitchen solutions today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productsLoading && products.length > 0) {
      const context = generateSystemContext(products);
      setSystemInstruction(`You are the MKS AI Assistant, a friendly and highly knowledgeable expert on commercial kitchen equipment from Master Kitchen Solution (MKS). Your goal is to help users find products, answer questions about MKS, and provide information about our services and brands.

RULES:
- Use ONLY the information provided in the 'Company Information' and 'Product Catalog' sections below to answer user questions.
- If the information is not in the provided data, politely state that you don't have that specific detail and suggest they contact an MKS representative for the most accurate information. DO NOT make up information.
- When a user asks for a product, provide its name, ID, and brand. If multiple products match, list them clearly.
- If a user asks a general question about the company (e.g., contact info, services), use the 'Company Information' to answer.
- Keep your answers helpful and concise. Format lists with bullet points for readability.
- You are an assistant for MKS Food Service, not a generic AI. Frame your responses accordingly.

DATA:
${context}
`);
    }
  }, [products, productsLoading]);


  const sendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;
    if (productsLoading || !systemInstruction) {
        setMessages(prev => [...prev, {role: 'model', text: 'I am still getting ready. Please wait a moment and try again.'}]);
        return;
    }

    setIsLoading(true);
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text: prompt }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
        }
      });
      
      const text = response.text;
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error. Please try again. (${errorMessage})` }]);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, error, sendMessage };
};