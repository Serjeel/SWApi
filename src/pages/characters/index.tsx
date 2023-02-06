import Link from "next/link";
import { useQuery } from "@apollo/client";
import { ALL_CHARACTERS } from "src/apollo/queries";

import styles from "@/styles/globalStyles.module.css";

export default function characters() {
  const { data } = useQuery(ALL_CHARACTERS);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.contentLines}>
          {data &&
            data.allCharacters.characters.map((character: any, i: any) => (
              <div key={`character-${i}`}>
                <Link href={`/characters/${i + 1}`}>
                  <p className={styles.name}>{character.name}</p>
                </Link>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
