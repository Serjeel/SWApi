import Image from "next/image";
import ErrorImage from "../images/Error404.jpg";

import styles from "../styles/Error404.module.css";

export default function Error404Page() {
  return (
    <>
      <main>
        <Image
          className={styles.errorImage}
          sizes="100%"
          src={ErrorImage}
          alt="error-image"
        />
      </main>
    </>
  );
}
