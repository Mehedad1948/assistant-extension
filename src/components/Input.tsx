import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | false,
  error?: string | false,
};

export default function Input({
  type = 'text',
  label = false,
  error = false,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label className='text-sm font-medium text-gray-700'>{label}</label>
      )}

      <input
        type={type}
        className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'} 
          ${className}`}
        {...props}
      />

      {error && <p className='text-sm text-red-600'>{error}</p>}
    </div>
  );
}
