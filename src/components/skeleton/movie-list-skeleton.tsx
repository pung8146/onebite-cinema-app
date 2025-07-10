import style from "./movie-list-skeleton.module.css";

// 내부에서만 사용하는 MovieItemSkeleton 컴포넌트
function MovieItemSkeleton() {
  return (
    <div className={style.itemContainer}>
      <div className={style.image}></div>
    </div>
  );
}

interface MovieListSkeletonProps {
  count: number;
  gridColumns?: number;
}

export default function MovieListSkeleton({
  count,
  gridColumns = 5,
}: MovieListSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <MovieItemSkeleton key={index} />
  ));

  return (
    <div
      className={style.container}
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      }}
    >
      {skeletons}
    </div>
  );
}
