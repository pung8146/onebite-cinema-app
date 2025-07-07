import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/`,
    { cache: "no-store" }
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
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

export default function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecommendMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
