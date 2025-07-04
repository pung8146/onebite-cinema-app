import ClientComponent from "../../components/client-component";
import ServerComponent from "../../components/server-compoents";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      Index
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
