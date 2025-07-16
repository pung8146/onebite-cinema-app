import MoviePage from "@/app/movie/[id]/page";
import Modal from "@/components/modal";

export default function Page(props: any) {
  return (
    <div>
      <Modal>
        <MoviePage {...props} />
      </Modal>
    </div>
  );
}
