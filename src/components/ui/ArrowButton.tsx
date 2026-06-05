'use client';

import { useState } from 'react';

interface ArrowButtonProps {
  label: string;
  onClick?: () => void;
  /** 'sm' = header size, 'md' = hero size */
  size?: 'sm' | 'md';
  /** 'dark' = black bg, white circle; 'light' = white bg, dark circle */
  variant?: 'dark' | 'light';
  fullWidth?: boolean;
  className?: string;
}

const ArrowIcon = () => (
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ width: '100%', height: '100%' }}
  >
    <g
      transform="translate(-324.000000, -6439.000000) translate(56.000000, 160.000000) translate(268.000000, 6279.000000)"
      fill="currentColor"
      fillRule="evenodd"
    >
      <polygon
        points="0 18.602 1.393 19.997 18 3.349 18 14 20 14 20 0 5.907 0 5.877 2 16.634 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default function ArrowButton({
  label,
  onClick,
  size = 'md',
  variant = 'dark',
  fullWidth = false,
  className = '',
}: ArrowButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isSmall = size === 'sm';
  const isLight = variant === 'light';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group flex items-center gap-2 rounded-full cursor-pointer btn-press glow-pulse ${fullWidth ? 'w-full justify-between' : ''} ${
        isSmall
          ? isLight
            ? 'bg-white text-[#05080c] pl-6 pr-1.5 py-1.5 text-[16px] font-medium tracking-tight'
            : 'bg-[#05080c] text-[#e1e1e1] pl-6 pr-1.5 py-1.5 text-[16px] font-medium tracking-tight'
          : isLight
            ? 'bg-white text-[#05080c] pl-6 pr-3 py-3 text-base font-medium tracking-tight'
            : 'bg-[#05080c] text-white pl-6 pr-3 py-3 text-base font-medium tracking-tight'
      } ${className}`}
    >
      <span>{label}</span>

      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 36,
          height: 36,
          background: isLight ? '#05080c' : '#ffffff',
          color: isLight ? '#ffffff' : '#05080c',
          perspective: 200,
        }}
      >
        <span
          style={{
            width: isSmall ? 14 : 16,
            height: isSmall ? 14 : 16,
            display: 'flex',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}
