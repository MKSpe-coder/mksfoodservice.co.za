import React from 'react';
import { IconPlus, IconMinus } from '../../constants';

interface QuantityInputProps {
  quantity: number;
  onDecrease: (e: React.MouseEvent) => void;
  onIncrease: (e: React.MouseEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onDecrease, onIncrease, onChange, min = 1 }) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-1.5 border border-mks-gray/30 rounded-l-md text-mks-dark disabled:opacity-50 hover:bg-mks-light-gray transition-colors"
        aria-label="Decrease quantity"
      >
        <IconMinus className="w-4 h-4" />
      </button>
      <input
        type="number"
        min={min}
        value={quantity}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        className="w-14 text-center bg-white border-t border-b border-mks-gray/30 p-1.5 focus:outline-none focus:ring-1 focus:ring-mks-red"
        aria-label="Current quantity"
      />
      <button
        type="button"
        onClick={onIncrease}
        className="p-1.5 border border-mks-gray/30 rounded-r-md text-mks-dark hover:bg-mks-light-gray transition-colors"
        aria-label="Increase quantity"
      >
        <IconPlus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantityInput;