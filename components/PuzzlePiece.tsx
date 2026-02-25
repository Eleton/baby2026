"use client";

interface PuzzlePieceProps {
  imagePath: string;
  rows: number;
  cols: number;
  pieceIndex: number;
  cellWidth: number;
  cellHeight: number;
  isSelected: boolean;
  isCorrect: boolean;
  isDragging: boolean;
  slotIndex: number;
  onDragStart: (slotIndex: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (slotIndex: number) => void;
  onClick: (slotIndex: number) => void;
}

export default function PuzzlePiece({
  imagePath,
  rows,
  cols,
  pieceIndex,
  cellWidth,
  cellHeight,
  isSelected,
  isCorrect,
  isDragging,
  slotIndex,
  onDragStart,
  onDragOver,
  onDrop,
  onClick,
}: PuzzlePieceProps) {
  const originalRow = Math.floor(pieceIndex / cols);
  const originalCol = pieceIndex % cols;

  const bgPosX = cols > 1 ? (originalCol / (cols - 1)) * 100 : 0;
  const bgPosY = rows > 1 ? (originalRow / (rows - 1)) * 100 : 0;

  return (
    <div
      data-slot={slotIndex}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(slotIndex));
        onDragStart(slotIndex);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(e);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(slotIndex);
      }}
      onClick={() => onClick(slotIndex)}
      className={`
        relative cursor-grab active:cursor-grabbing
        rounded transition-all duration-150
        ${isSelected ? "ring-3 ring-pink-400 scale-95 z-10" : ""}
        ${isCorrect ? "ring-2 ring-green-400" : ""}
        ${isDragging ? "opacity-50" : ""}
      `}
      style={{
        width: cellWidth,
        height: cellHeight,
        backgroundImage: `url(${imagePath})`,
        backgroundSize: `${cols * 100}% ${rows * 100}%`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
      }}
    />
  );
}
