import Link from "next/link";
import { gql } from "@apollo/client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import client from "@/apollo/client";
import ContentCard from "@/components/ContentCard";
import Episode1Image from "src/images/SWEp1.jpg";
import Episode2Image from "src/images/SWEp2.jpg";
import Episode3Image from "src/images/SWEp3.jpg";
import Episode4Image from "src/images/SWEp4.jpg";
import Episode5Image from "src/images/SWEp5.jpg";
import Episode6Image from "src/images/SWEp6.jpg";

import styles from "@/styles/globalStyles.module.css";

export default function Films({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const filmsArray = [
    Episode4Image,
    Episode5Image,
    Episode6Image,
    Episode1Image,
    Episode2Image,
    Episode3Image,
  ];

  return (
    <>
      <main className={styles.main}>
        <div className={styles.cardsContainer}>
          {data &&
            data.allFilms.films.map((film: any, i: any) => (
              <div className={styles.item} key={`film-${i}`}>
                <Link href={`/films/${i + 1}`}>
                  <ContentCard
                    variant="film"
                    image={filmsArray[i]}
                    name={film.title}
                  ></ContentCard>
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
      query AllFilms {
        allFilms {
          films {
            title
          }
        }
      }
    `,
  });

  return {
    props: { data },
  };
};
