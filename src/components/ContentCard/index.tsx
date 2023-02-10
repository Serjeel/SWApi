import Image, { StaticImageData } from "next/image";

import styles from "./ContentCard.module.css";

interface IContentCardProps {
  variant: string;
  image: StaticImageData;
  name: string;
}

export default function ContentCard({
  variant,
  image,
  name,
}: IContentCardProps) {
  return (
    <>
      <div
        className={
          variant === "category" ? styles.categoryCard : styles.filmCard
        }
      >
        <div className={styles.content}>
          <Image
            className={
              variant === "category"
                ? styles.categoryCardImage
                : styles.filmCardImage
            }
            sizes="100%"
            src={image}
            alt={name}
          />
          <p className={styles.name}>{name}</p>
        </div>
      </div>
    </>
  );
}
