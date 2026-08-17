interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader = ({ index, title, subtitle, align = 'left' }: SectionHeaderProps) => {
  const isCenter = align === 'center';
  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <span className="font-mono text-neon-volt text-sm tracking-widest opacity-70">
          // {index}.
        </span>
        <div className="h-px w-12 bg-neon-volt opacity-30" />
      </div>
      <h2 className={`font-display text-4xl md:text-5xl font-bold text-ghost-white tracking-tight leading-none ${isCenter ? 'mx-auto' : ''}`}>
        {title}
        <span className="text-neon-volt">_</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 text-dim-gray font-body text-base max-w-xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
