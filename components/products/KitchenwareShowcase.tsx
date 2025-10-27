import React from 'react';

const subCategories = [
    { name: 'Utensils', id: 'utensils' },
    { name: 'Containers & Storage', id: 'containers-storage' },
    { name: 'Tools & Gadgets', id: 'tools-gadgets' },
    { name: 'Baskets & Racks', id: 'baskets-racks' }
];

const KitchenwareShowcase: React.FC = () => {
    return (
        <div className="bg-mks-light-gray p-6 rounded-lg mb-8 text-center">
            <h2 className="text-2xl font-semibold text-mks-dark mb-4">Kitchenware Essentials</h2>
            <p className="text-mks-gray mb-6">Quickly navigate to our kitchenware sub-categories.</p>
            <div className="flex flex-wrap justify-center gap-3">
                {subCategories.map(subCat => (
                    <a 
                        key={subCat.id}
                        href={`#${subCat.id}`}
                        className="px-4 py-2 bg-white text-mks-dark font-semibold rounded-full shadow-sm border border-mks-gray/20 hover:bg-mks-red hover:text-white hover:border-mks-red transition-all duration-200"
                    >
                        {subCat.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default KitchenwareShowcase;
