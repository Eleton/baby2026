export interface PuzzleConfig {
  id: string;
  title: string;
  imagePath: string;
  rows: number;
  cols: number;
}

export const puzzles: PuzzleConfig[] = [
  {
    id: "baby-1",
    title: "Fire Spinning",
    imagePath: "/puzzles/baby-1.jpg",
    rows: 3,
    cols: 3,
  },
  {
    id: "baby-2",
    title: "Sunny Day",
    imagePath: "/puzzles/baby-2.jpg",
    rows: 4,
    cols: 3,
  },
  {
    id: "baby-3",
    title: "Naturhistoriska Museet",
    imagePath: "/puzzles/baby-3.jpg",
    rows: 4,
    cols: 3,
  },
  {
    id: "baby-4",
    title: "Yasuragi",
    imagePath: "/puzzles/baby-4.jpg",
    rows: 4,
    cols: 3,
  },
  {
    id: "baby-5",
    title: "To Poland!",
    imagePath: "/puzzles/baby-5.jpg",
    rows: 3,
    cols: 4,
  },
  {
    id: "baby-6",
    title: "Gröna Lund",
    imagePath: "/puzzles/baby-6.jpg",
    rows: 3,
    cols: 4,
  }
];

export function getPuzzleById(id: string): PuzzleConfig | undefined {
  return puzzles.find((p) => p.id === id);
}
