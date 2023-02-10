import Link from "next/link";
import { gql } from "@apollo/client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import client from "@/apollo/client";

import styles from "@/styles/globalStyles.module.css";

export default function Characters({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.contentLines}>
          {data &&
            data.allCharacters.characters.map((character: any, i: any) => (
              <div key={`character-${i}`}>
                <Link href={i < 16 ? `/characters/${i + 1}` : `/characters/${i + 2}`}> {/*В апи отстутствует 17 персонаж*/}
                  <p className={styles.name}>{character.name}</p>
                </Link>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query AllCharActers {
        allCharacters: allPeople {
          characters: people {
            name
          }
        }
      }
    `,
  });

  return {
    props: { data },
  };
};
