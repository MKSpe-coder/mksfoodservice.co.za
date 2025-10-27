
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-mks-red text-white hover:bg-opacity-90 focus:ring-mks-red";
      break;
    case 'secondary':
      variantStyles = "bg-mks-dark text-white hover:bg-opacity-90 focus:ring-mks-dark";
      break;
    case 'outline':
      variantStyles = "bg-transparent text-mks-red border border-mks-red hover:bg-mks-red hover:text-white focus:ring-mks-red";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-3 py-1.5 text-xs";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-sm";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-base";
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
