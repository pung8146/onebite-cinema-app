import MovieItemSkeleton from "./movie-item-skeleton";
import style from "./movie-list-skeleton.module.css";

export default function MovieListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, index) => <MovieItemSkeleton key={index} />);
}
