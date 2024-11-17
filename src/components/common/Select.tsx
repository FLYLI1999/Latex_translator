import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  icon,
  disabled = false,
  className = '',
  placeholder
}) => {
  const baseStyles = `
    relative w-full rounded-md border py-1.5 pl-3 pr-8
    min-w-[120px]
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    transition-colors duration-200
    dark:bg-gray-800 dark:text-white
    appearance-none
    ${disabled 
      ? 'border-gray-200 dark:border-gray-700' 
      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
    }
  `;

  return (
    <div className="relative">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center z-10">
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            ${baseStyles}
            ${icon ? 'pl-8' : 'pl-3'}
            ${className}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white dark:bg-gray-700"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default Select;
