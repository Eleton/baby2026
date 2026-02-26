import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-4xl font-bold text-pink-500">
        Baby Baby Baby Baby Baby Baby Baby
      </h1>
      <p className="mb-10 text-xl text-gray-500">
        Have a very happy birthday 🥳
      </p>
      <Link
        href="/play"
        className="rounded-full bg-pink-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-pink-600"
      >
        Start
      </Link>
    </div>
  );
}
