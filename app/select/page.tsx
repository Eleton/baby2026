import Link from "next/link";
import { puzzles } from "@/lib/puzzles";

export default function SelectPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold text-pink-500">
        Pick a Puzzle
      </h1>
      <p className="mb-10 text-gray-500">Choose any puzzle to play!</p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((puzzle) => (
          <Link
            key={puzzle.id}
            href={`/puzzle/${puzzle.id}`}
            className="group overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-sm transition-all hover:scale-[1.03] hover:border-pink-200 hover:shadow-lg"
          >
            <div
              className="aspect-square w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${puzzle.imagePath})` }}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-pink-500">
                {puzzle.title}
              </h2>
              <p className="text-sm text-gray-400">
                {puzzle.rows} &times; {puzzle.cols} &mdash;{" "}
                {puzzle.rows * puzzle.cols} pieces
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
