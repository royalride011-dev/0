import React from 'react';
import { useLanguage } from '../LanguageContext';

export function GoldCorners() {
  return (
    <>
      <div className="filigree-corner tl" />
      <div className="filigree-corner tr" />
      <div className="filigree-corner bl" />
      <div className="filigree-corner br" />
    </>
  );
}

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-4 my-6 select-none ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A85C]/50 to-[#C5A85C]" />
      <div className="relative flex items-center justify-center">
        {/* Subtle royal geometric symbol (diamond with small circle) */}
        <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A85C] bg-black flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#C5A85C]" />
        </div>
        <div className="absolute w-6 h-6 rounded-full border border-[#C5A85C]/15 animate-pulse" />
      </div>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A85C]/50 to-[#C5A85C]" />
    </div>
  );
}

interface RoyalFrameProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function RoyalFrame({ children, className = '', glow = false }: RoyalFrameProps) {
  return (
    <div className={`relative p-8 rounded-2xl bg-gradient-to-b from-royal-navy-900/90 to-royal-navy-950/95 border border-[#C5A85C]/25 shadow-2xl overflow-hidden group transition-all duration-500 hover:border-[#C5A85C]/55 ${className}`}>
      {/* Decorative internal thin border */}
      <div className="absolute inset-2 border border-[#C5A85C]/10 rounded-xl pointer-events-none group-hover:border-[#C5A85C]/30 transition-colors duration-500" />
      
      {/* Soft, beautiful warm golden ambient radial glow in the background */}
      {glow && (
        <div className="absolute -inset-10 bg-radial-gradient from-[#C5A85C]/5 via-transparent to-transparent opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity duration-700 blur-2xl" />
      )}

      {/* Luxury corner filigree or simple clean gold corners */}
      <GoldCorners />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

interface GoldSymmetricalHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'center' | 'right' | 'left';
  className?: string;
}

export function GoldSymmetricalHeader({
  title,
  subtitle,
  badge,
  align = 'center',
  className = ''
}: GoldSymmetricalHeaderProps) {
  const { isRtl } = useLanguage();
  const alignmentClass = align === 'center' ? 'text-center' : (isRtl ? 'text-right' : 'text-left');
  const dividerAlignClass = align === 'center' ? 'mx-auto' : (isRtl ? 'ml-auto' : 'mr-auto');

  return (
    <div className={`${alignmentClass} max-w-3xl ${align === 'center' ? 'mx-auto' : ''} ${className}`}>
      {badge && (
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#C5A85C]/12 rounded border border-[#C5A85C]/35 mb-4 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A85C] animate-ping" />
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#C5A85C] uppercase">
            {badge}
          </span>
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-luxury-gradient leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-xs sm:text-sm text-champagne-gold-100/70 mt-3.5 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
      <GoldDivider className={dividerAlignClass} />
    </div>
  );
}
