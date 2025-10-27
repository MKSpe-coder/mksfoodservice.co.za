import React from 'react';
import { Link } from 'react-router-dom';

const IconChat: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);


const ChatFAB: React.FC = () => {
    return (
        <Link
            to="/gemini"
            className="fixed bottom-6 right-6 bg-mks-red text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mks-red transform transition-transform hover:scale-110 z-40"
            aria-label="Open AI Assistant"
            title="AI Assistant"
        >
            <IconChat className="w-8 h-8" />
        </Link>
    );
};

export default ChatFAB;
