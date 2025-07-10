import MovieItem from "@/components/movie-item";
import { delay } from "@/util/delay";
import { MovieData } from "@/types";
import style from "./page.module.css";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const movies: MovieData[] = await response.json();

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function SearchBar({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  return (
    <Suspense key={searchParams.q} fallback={<div>Loading...</div>}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
