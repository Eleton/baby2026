export interface PuzzleConfig {
  id: string;
  title: string;
  imagePath: string;
  rows: number;
  cols: number;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const puzzles: PuzzleConfig[] = [
  {
    id: "baby-1",
    title: "Fire Spinning",
    imagePath: `${basePath}/puzzles/baby-1.jpg`,
    rows: 3,
    cols: 3,
  },
  {
    id: "baby-2",
    title: "Sunny Day",
    imagePath: `${basePath}/puzzles/baby-2.jpg`,
    rows: 4,
    cols: 3,
  },
  {
    id: "baby-3",
    title: "Naturhistoriska Museet",
    imagePath: `${basePath}/puzzles/baby-3.jpg`,
    rows: 4,
    cols: 3,
  },
  {
    id: "baby-4",
    title: "Yasuragi",
    imagePath: `${basePath}/puzzles/baby-4.jpg`,
    rows: 4,
    cols: 3,
  },
  {
    id: "baby-5",
    title: "To Poland!",
    imagePath: `${basePath}/puzzles/baby-5.jpg`,
    rows: 3,
    cols: 4,
  },
  {
    id: "baby-6",
    title: "Gröna Lund",
    imagePath: `${basePath}/puzzles/baby-6.jpg`,
    rows: 3,
    cols: 4,
  }
];

export function getPuzzleById(id: string): PuzzleConfig | undefined {
  return puzzles.find((p) => p.id === id);
}
