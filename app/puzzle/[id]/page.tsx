import { notFound } from "next/navigation";
import { getPuzzleById, puzzles } from "@/lib/puzzles";
import PuzzleBoard from "@/components/PuzzleBoard";

interface PuzzlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return puzzles.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PuzzlePageProps) {
  const { id } = await params;
  const puzzle = getPuzzleById(id);
  if (!puzzle) return { title: "Puzzle Not Found" };
  return { title: `${puzzle.title} — Birthday Puzzles` };
}

export default async function PuzzlePage({ params }: PuzzlePageProps) {
  const { id } = await params;
  const puzzle = getPuzzleById(id);
  if (!puzzle) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8">
      <PuzzleBoard puzzle={puzzle} />
    </main>
  );
}
