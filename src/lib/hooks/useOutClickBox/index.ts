import React from 'react';

type UseOutClickBoxProps = {
  ref: React.RefObject<HTMLElement>;
  onOutClick: () => void;
  enabled?: boolean;
};

export const useOutClickBox = ({ ref, onOutClick, enabled = true }: UseOutClickBoxProps) => {
  React.useEffect(() => {
    if (enabled) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onOutClick();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref, onOutClick, enabled]);
};
