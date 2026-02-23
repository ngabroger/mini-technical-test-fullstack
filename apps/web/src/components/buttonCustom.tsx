import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} style={{ padding: '6px 16px', margin: 4, ...props.style }}>
      {children}
    </button>
  );
}