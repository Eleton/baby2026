import Link from "next/link";

export default function PuzzleNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-gray-800">Puzzle not found</h1>
      <p className="text-gray-500">That puzzle doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-full bg-pink-500 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-600"
      >
        Back to Puzzles
      </Link>
    </div>
  );
}
