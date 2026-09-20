import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  background?: 'white' | 'muted' | 'navy';
}

export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'lg',
  background = 'white',
  className = '',
  ...props
}) => {
  const spacingStyles = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  }[spacing];

  const backgroundStyles = {
    white: 'bg-white',
    muted: 'bg-[#F8FAFC]',
    navy: 'bg-[#0F2444] text-white',
  }[background];

  return (
    <section className={`${spacingStyles} ${backgroundStyles} ${className}`} {...props}>
      {children}
    </section>
  );
};
