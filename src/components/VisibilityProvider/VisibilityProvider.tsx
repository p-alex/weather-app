import { useCallback, useEffect, useRef, useState } from "react";

type ToggleProps = {
  toggleRef: React.RefObject<HTMLButtonElement | null>;
  toggleVisibility: () => void;
};

type ContentProps = {
  toggleVisibilityOff: () => void;
  toggleHeight: number;
};

interface Props {
  toggle: (props: ToggleProps) => React.ReactNode;
  content: (props: ContentProps) => React.ReactNode;
}

function VisibilityProvider({ toggle, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const toggleVisibilityOff = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        containerRef.current!.contains(document.activeElement)
      ) {
        toggleVisibilityOff();
        toggleRef.current?.focus();
      }
    },
    [toggleVisibilityOff]
  );

  const handleClickOutside = useCallback(
    (event: PointerEvent) => {
      if (!isVisible) return;
      const target = event.target as Node;
      if (!containerRef.current?.contains(target)) {
        toggleVisibilityOff();
      }
    },
    [toggleVisibilityOff, isVisible]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleEscKey, handleClickOutside]);

  return (
    <div ref={containerRef} className="relative">
      {toggle({ toggleVisibility, toggleRef })}
      {isVisible &&
        content({
          toggleVisibilityOff,
          toggleHeight: toggleRef.current?.getBoundingClientRect().height ?? 0,
        })}
    </div>
  );
}

export default VisibilityProvider;
