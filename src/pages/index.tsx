import Link from "next/link";
import FilmsImage from "src/images/SWFilms.jpg";
import CharactersImage from "src/images/SWCharacters2.jpg";
import SpeciesImage from "src/images/SWSpecies2.png";
import ContentCard from "@/components/ContentCard";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.item}>
            <Link href={"/films"}>
              <ContentCard
                variant="category"
                image={FilmsImage}
                name="Films"
              ></ContentCard>
            </Link>
          </div>
          <div className={styles.item}>
            <Link href={"/characters"}>
              <ContentCard
                variant="category"
                image={CharactersImage}
                name="Characters"
              ></ContentCard>
            </Link>
          </div>
          <div className={styles.item}>
            <Link href={"/species"}>
              <ContentCard
                variant="category"
                image={SpeciesImage}
                name="Species"
              ></ContentCard>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
