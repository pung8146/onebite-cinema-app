import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function AllMovies() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/`,
    { cache: "force-cache" } // 전체 영화 목록은 크게 변화가 없을것이라 예상하여 캐시된 데이터를 사용합니다.
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const allMovies: MovieData[] = await response.json();
  return (
    <div className={style.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={`${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function RecommendMovies() {
  await delay(1000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } } // 사용자에게 매번 다른 데이터를 보여주는게 좋지만 실시간 변화까지는 요구 되지 않을것이라 예상하여 3초마다 데이터를 최신화 합니다.
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const recommendMovies: MovieData[] = await response.json();
  return (
    <div className={style.reco_conatiner}>
      {recommendMovies.slice(0, 3).map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<MovieListSkeleton count={3} gridColumns={3} />}>
          <RecommendMovies />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieListSkeleton count={5} gridColumns={5} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
