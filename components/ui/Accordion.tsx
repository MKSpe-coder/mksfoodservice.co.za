
import React from 'react';
import { IconChevronDown } from '../../constants';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-mks-gray/20">
      <h2>
        <button
          type="button"
          className="flex justify-between items-center w-full p-5 font-medium text-left text-mks-dark hover:bg-mks-light-gray focus:outline-none focus:ring-2 focus:ring-mks-red"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <IconChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="p-5 text-mks-gray">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;