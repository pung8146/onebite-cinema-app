"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author || !movieId) {
    return;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
    console.log("ReviewEditor res", res.status);
    revalidateTag(`review-${movieId}`);
  } catch (error) {
    console.error(error);
    return;
  }
}
