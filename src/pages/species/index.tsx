import Link from "next/link";
import { gql } from "@apollo/client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import client from "@/apollo/client";

import styles from "@/styles/globalStyles.module.css";

export default function Species({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query AllSpecies {
        allSpecies {
          species {
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
