"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { PuzzleConfig } from "@/lib/puzzles";
import PuzzlePiece from "./PuzzlePiece";
import Confetti from "./Celebration";

function shuffleArray(arr: number[]): number[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateShuffledPositions(count: number): number[] {
  const ordered = Array.from({ length: count }, (_, i) => i);
  let shuffled: number[];
  do {
    shuffled = shuffleArray(ordered);
  } while (shuffled.every((val, idx) => val === idx));
  return shuffled;
}

function checkSolved(positions: number[]): boolean {
  return positions.every((piece, slot) => piece === slot);
}

const MAX_BOARD_WIDTH = 600;

interface PuzzleBoardProps {
  puzzle: PuzzleConfig;
  onSolved?: () => void;
}

export default function PuzzleBoard({ puzzle, onSolved }: PuzzleBoardProps) {
  const { rows, cols, imagePath, title } = puzzle;
  const totalPieces = rows * cols;

  const [positions, setPositions] = useState<number[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [dragSource, setDragSource] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(MAX_BOARD_WIDTH);

  // Preload image to get aspect ratio
  useEffect(() => {
    setImageLoaded(false);
    const img = new window.Image();
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
      setImageLoaded(true);
    };
    img.src = imagePath;
  }, [imagePath]);

  // Initialize / reset positions when puzzle changes
  useEffect(() => {
    setPositions(generateShuffledPositions(totalPieces));
    setIsSolved(false);
    setSelectedSlot(null);
    setDragSource(null);
    setShowHint(false);
  }, [totalPieces, imagePath]);

  // Responsive sizing
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const w = Math.min(containerRef.current.offsetWidth, MAX_BOARD_WIDTH);
        setContainerWidth(w);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const boardWidth = containerWidth;
  const boardHeight = boardWidth / aspectRatio;
  const cellWidth = boardWidth / cols;
  const cellHeight = boardHeight / rows;

  const swapPieces = useCallback(
    (slotA: number, slotB: number) => {
      if (slotA === slotB) return;
      setPositions((prev) => {
        const next = [...prev];
        [next[slotA], next[slotB]] = [next[slotB], next[slotA]];
        if (checkSolved(next)) {
          setIsSolved(true);
          onSolved?.();
        }
        return next;
      });
      setSelectedSlot(null);
      setDragSource(null);
    },
    [onSolved],
  );

  const handleClick = useCallback(
    (slotIndex: number) => {
      if (isSolved) return;
      if (selectedSlot === null) {
        setSelectedSlot(slotIndex);
      } else if (selectedSlot === slotIndex) {
        setSelectedSlot(null);
      } else {
        swapPieces(selectedSlot, slotIndex);
      }
    },
    [selectedSlot, isSolved, swapPieces],
  );

  const handleDragStart = useCallback(
    (slotIndex: number) => {
      if (isSolved) return;
      setDragSource(slotIndex);
    },
    [isSolved],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (slotIndex: number) => {
      if (dragSource === null || isSolved) return;
      swapPieces(dragSource, slotIndex);
    },
    [dragSource, isSolved, swapPieces],
  );

  if (positions.length === 0 || !imageLoaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-lg text-gray-400">Loading puzzle...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex w-full max-w-[600px] flex-col items-center gap-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <div className="relative">
        {/* Puzzle grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellWidth}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellHeight}px)`,
            width: boardWidth,
            height: boardHeight,
          }}
        >
          {positions.map((pieceIndex, slotIndex) => (
            <PuzzlePiece
              key={slotIndex}
              imagePath={imagePath}
              rows={rows}
              cols={cols}
              pieceIndex={pieceIndex}
              cellWidth={cellWidth}
              cellHeight={cellHeight}
              isSelected={selectedSlot === slotIndex}
              isCorrect={pieceIndex === slotIndex}
              isDragging={dragSource === slotIndex}
              slotIndex={slotIndex}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleClick}
            />
          ))}
        </div>

        {/* Hint overlay */}
        {showHint && (
          <div
            className="pointer-events-none absolute inset-0 rounded bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${imagePath})` }}
          />
        )}
      </div>

      {/* Controls */}
      {!isSolved && (
        <div className="flex gap-4">
          <button
            onMouseDown={() => setShowHint(true)}
            onMouseUp={() => setShowHint(false)}
            onMouseLeave={() => setShowHint(false)}
            onTouchStart={() => setShowHint(true)}
            onTouchEnd={() => setShowHint(false)}
            className="rounded-full border-2 border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-pink-400 hover:text-pink-500"
          >
            Hold for Hint
          </button>
        </div>
      )}

      <p className="text-sm text-gray-400">
        {rows} &times; {cols} &mdash; {totalPieces} pieces
        {!isSolved && selectedSlot !== null && " (tap another piece to swap)"}
      </p>

      {isSolved && <Confetti />}
    </div>
  );
}
