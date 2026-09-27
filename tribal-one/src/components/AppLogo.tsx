import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo: React.FC<AppLogoProps> = ({ className = 'w-10 h-10', size }) => {
  return (
    <img
      src="/logo.jpg"
      alt="Tribal One"
      className={`rounded-full object-cover ${className}`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};
