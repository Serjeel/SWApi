import Link from "next/link";
import { useQuery } from "@apollo/client";
import { ALL_SPECIES } from "src/apollo/queries";
import styles from "./species.module.css";

export default function Species() {
  const { data } = useQuery(ALL_SPECIES);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.contentLines}>
          {data &&
            data.allSpecies.species.map((specie: any, i: any) => (
              <div key={`specie-${i}`}>
                <Link href={`/species/${i + 1}`}>
                  <p className={styles.name}>{specie.name}</p>
                </Link>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
