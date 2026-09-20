import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import { Container } from './Container';

export interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  description,
  eyebrow,
  action,
  className = '',
}) => {
  return (
    <div className={`bg-white border-b border-[#E2E8F0] py-8 md:py-10 ${className}`}>
      <Container>
        {breadcrumbs && (
          <div className="mb-4">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488] mb-1.5 block">
                {eyebrow}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2444] tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm sm:text-base text-[#475569] leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>
      </Container>
    </div>
  );
};
