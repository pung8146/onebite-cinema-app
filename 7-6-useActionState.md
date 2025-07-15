# useActionState

- react 19 버전 이상에서 도입된 form 처리 훅
- 첫번째 인자에는 핸들링할려는 폼에 액션 함수를 넣어줘야 합니다
- 두번째 인자에는 폼의 상태의 초기값을 넣어줍니다.
- form 태그에 action 속성에 넣어준 액션 함수를 호출합니다.
- state 는 액션 함수의 반환값을 저장하는 상태 값입니다.
- formAction 은 form 태그에 action 속성에 넣어준 액션 함수를 호출합니다.
- isPending 은 액션 함수가 실행중인지 여부를 반환합니다. (실행중이면 true)

```tsx
"use client";
import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState } from "react";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  return (
    <section className={style.form_container}>
      <form action={formAction}>
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
```

## 주의사항

- 서버액션 함수는 두번째 인자로 폼의 상태를 받아오기 때문에 첫번째 인자로 넣어준 액션 함수 내부에서 폼의 상태를 받아오기 위해서는 첫번째 인자를 넣어줘야 합니다.

```tsx
"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(state: any, formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author || !movieId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidateTag(`review-${movieId}`);
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. ${error}`,
    };
  }
}
```
