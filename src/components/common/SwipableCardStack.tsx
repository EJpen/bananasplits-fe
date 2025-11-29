import React, { useState, useRef, type ReactNode } from "react";

interface SwipableCardStackProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => ReactNode;
  getItemKey: (item: T) => string;
  className?: string;
  maxVisibleCards?: number;
}

export function SwipableCardStack<T>({
  items,
  renderCard,
  getItemKey,
  className = "",
  maxVisibleCards = 4,
}: SwipableCardStackProps<T>) {
  const [displayOrder, setDisplayOrder] = useState<number[]>(() =>
    items.map((_, i) => i)
  );
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayedItems = displayOrder
    .map((index) => items[index])
    .filter(Boolean);

  const cycleDisplayOrder = () => {
    setDisplayOrder((prev) => {
      const newOrder = [...prev];
      const first = newOrder.shift();
      if (first !== undefined) newOrder.push(first);
      return newOrder;
    });
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStartX.current;
    setDragX(delta);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (Math.abs(dragX) > 100) {
      const direction = dragX > 0 ? 1 : -1;
      setDragX(direction * 1000);

      setTimeout(() => {
        cycleDisplayOrder();
        setDragX(0);
      }, 300);
    } else {
      setDragX(0);
    }
  };

  // Mouse Handlers
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  // Touch Handlers
  const onTouchStart = (e: React.TouchEvent) =>
    handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) =>
    handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  return (
    <div
      className={`relative overflow-visible isolate ${className}`}
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ zIndex: 1 }}
    >
      {displayedItems.map((item, index) => {
        if (index >= maxVisibleCards) return null;

        const isTop = index === 0;
        let style: React.CSSProperties = {};

        if (isTop) {
          style = {
            transform: `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
            zIndex: 30,
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging
              ? "none"
              : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            top: "10px",
          };
        } else {
          const scale = 0.96 - index * 0.02;
          const translateY = -12 - index * 12;
          const opacity = 1 - index * 0.08;

          style = {
            transform: `scale(${scale}) translateY(${translateY}px)`,
            zIndex: 30 - index * 10,
            opacity: opacity,
            transition: "transform 0.3s ease, opacity 0.3s ease",
            filter: `brightness(${0.85 - index * 0.1})`,
          };
        }

        return (
          <div
            key={getItemKey(item)}
            className="absolute top-0 left-0 w-full"
            style={style}
            onMouseDown={isTop ? onMouseDown : undefined}
            onTouchStart={isTop ? onTouchStart : undefined}
          >
            {renderCard(item, index)}
          </div>
        );
      })}
    </div>
  );
}

export default SwipableCardStack;
