import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section className={style.form_container}>
      <form action={createReviewAction}>
        <input name="movieId" hidden value={movieId} readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
