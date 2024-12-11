import React, { CSSProperties } from 'react';

export const MentionLogo = ({ color = "rgb(var(--tw-clr-primary-100))", style }: { color?: string; style?: CSSProperties }) => {
  return (
    <svg viewBox="0 0 196 196" aria-label="Mention" role="img" style={style}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M 131.991 97.92 L 131.991 194.648 L 163.437 194.648 L 194.883 194.648 L 194.883 97.92 L 194.883 1.192 L 163.437 1.192 L 131.991 1.192 L 131.991 97.92 M 62.299 97.071 L 62.299 174.284 L 87.795 174.284 L 113.294 174.284 L 113.294 97.071 L 113.294 19.86 L 87.795 19.86 L 62.299 19.86 L 62.299 97.071 M 1.108 97.92 L 1.108 153.921 L 22.355 153.921 L 43.603 153.921 L 43.603 97.92 L 43.603 41.92 L 22.355 41.92 L 1.108 41.92 L 1.108 97.92"
        fill={color}
      />
    </svg>
  );
};
