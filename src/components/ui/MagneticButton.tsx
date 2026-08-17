import { useRef, ReactNode, MouseEvent, CSSProperties } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
}

export const MagneticButton = ({
  children,
  className = '',
  style,
  onClick,
  strength = 0.35,
  as: Tag = 'button',
  href,
  target,
  rel,
  id,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  const handleMouseEnter = () => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.1s linear';
  };

  const props = {
    ref,
    id,
    style,
    className: `magnetic-btn ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick,
    ...(Tag === 'a' ? { href, target, rel } : {}),
  };

  return <Tag {...props}>{children}</Tag>;
};
