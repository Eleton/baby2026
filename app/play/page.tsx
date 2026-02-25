"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { puzzles } from "@/lib/puzzles";
import PuzzleBoard from "@/components/PuzzleBoard";
import Confetti from "@/components/Celebration";

export default function PlayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmedImage, setConfirmedImage] = useState<string | null>(null);
  const allDone = currentIndex >= puzzles.length;

  const handleSolved = useCallback(() => {
    setSolved(true);
  }, []);

  const handleNext = useCallback(() => {
    setSolved(false);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  if (allDone && confirmedImage) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <Confetti />
        <h1 className="animate-pop-in mb-4 text-5xl font-bold text-pink-500">
          Your Puzzle Image
        </h1>
        <p className="mb-8 text-lg text-gray-500">
          Click the image to order your photo puzzle!
        </p>
        <a
          href="https://www.puzzleyou.se/fotopussel/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl shadow-2xl transition-transform hover:scale-105"
        >
          <Image
            src={confirmedImage}
            alt="Your chosen puzzle image"
            width={400}
            height={400}
            className="block object-cover"
            style={{ maxWidth: "min(400px, 90vw)", height: "auto" }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="rounded-full bg-pink-500 px-6 py-2 font-semibold text-white shadow-lg">
              Order at puzzleyou.se
            </span>
          </div>
        </a>
      </div>
    );
  }

  if (allDone) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <Confetti />
        <h1 className="animate-pop-in mb-2 text-4xl font-bold text-pink-500">
          Congratulations!
        </h1>
        <p className="mb-8 text-lg text-gray-500">
          You completed all {puzzles.length} puzzles! Now pick your favourite image.
        </p>
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {puzzles.map((puzzle) => (
            <button
              key={puzzle.id}
              onClick={() => setSelectedImage(puzzle.imagePath)}
              className={`relative overflow-hidden rounded-2xl border-4 transition-all hover:scale-105 ${
                selectedImage === puzzle.imagePath
                  ? "border-pink-500 shadow-lg shadow-pink-200"
                  : "border-transparent"
              }`}
            >
              <Image
                src={puzzle.imagePath}
                alt={puzzle.title}
                width={160}
                height={160}
                className="block object-cover"
                style={{ width: "100%", height: "auto" }}
              />
              {selectedImage === puzzle.imagePath && (
                <div className="absolute inset-0 flex items-end justify-center bg-pink-500/10 pb-2">
                  <span className="rounded-full bg-pink-500 px-3 py-0.5 text-xs font-semibold text-white">
                    Selected
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
        <button
          disabled={!selectedImage}
          onClick={() => selectedImage && setConfirmedImage(selectedImage)}
          className="rounded-full bg-pink-500 px-10 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    );
  }

  const puzzle = puzzles[currentIndex];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8">
      <p className="mb-4 text-sm text-gray-400">
        Puzzle {currentIndex + 1} of {puzzles.length}
      </p>

      <PuzzleBoard
        key={puzzle.id}
        puzzle={puzzle}
        onSolved={handleSolved}
      />

      {solved && (
        <button
          onClick={handleNext}
          className="mt-6 animate-pop-in rounded-full bg-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-pink-600"
        >
          {currentIndex < puzzles.length - 1 ? "Next Puzzle" : "Finish"}
        </button>
      )}
    </main>
  );
}
