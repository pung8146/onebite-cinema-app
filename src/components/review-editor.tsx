"use client";
import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state?.status) {
      alert(state?.error);
    }
  }, [state]);

  return (
    <section className={style.form_container}>
      <form action={formAction}>
        <input name="movieId" hidden value={movieId} readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "작성중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
