import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
  backgroundColor?: string;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  backgroundColor = 'bg-white',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px`,
        ...(rest as any).style
      }}
    >
      <div
        className="absolute w-full h-full opacity-70 top-0 left-0 animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle at top, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-full h-full opacity-70 bottom-0 right-0 animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle at bottom, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-full h-full opacity-70 top-0 left-0 animate-star-movement-left z-0"
        style={{
          background: `radial-gradient(circle at left, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-full h-full opacity-70 top-0 right-0 animate-star-movement-right z-0"
        style={{
          background: `radial-gradient(circle at right, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className={`relative z-1 ${backgroundColor} text-black text-center text-[16px] w-full h-full rounded-[20px] overflow-hidden`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
