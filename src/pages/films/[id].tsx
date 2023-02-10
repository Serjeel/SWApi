import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactNode, useEffect, useState } from "react";
import Episode1Image from "src/images/SWEp1.jpg";
import Episode2Image from "src/images/SWEp2.jpg";
import Episode3Image from "src/images/SWEp3.jpg";
import Episode4Image from "src/images/SWEp4.jpg";
import Episode5Image from "src/images/SWEp5.jpg";
import Episode6Image from "src/images/SWEp6.jpg";

import styles from "@/styles/globalStyles.module.css";

export default function FilmId({
  film,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const filmsArray = [
    Episode1Image,
    Episode2Image,
    Episode3Image,
    Episode4Image,
    Episode5Image,
    Episode6Image,
  ];

  const [characters, setCharacters] = useState<Array<ReactNode>>([]);
  const [species, setSpecies] = useState<Array<ReactNode>>([]);

  const apiRequest = async (charactersReq: any, speciesReq: any) => {
    let charactersArray = [];

    for (let i = 0; i < charactersReq.length; i++) {
      let charactersRes = await fetch(charactersReq[i])
        .then((response) => response.json())
        .then((data) => {
          return data;
        });

      const urlArray = charactersRes.url.split("/");

      charactersArray.push(
        <Link
          key={`character-${i}`}
          className={styles.link}
          href={`/characters/${urlArray[urlArray.length - 2]}`}
        >
          {charactersRes.name}
        </Link>
      );
    }

    setCharacters(charactersArray);

    let speciesArray = [];

    for (let i = 0; i < speciesReq.length; i++) {
      let speciesRes = await fetch(speciesReq[i])
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      const urlArray = speciesRes.url.split("/");

      speciesArray.push(
        <Link
          key={`specie-${i}`}
          className={styles.link}
          href={`/${urlArray[urlArray.length - 3]}/${
            urlArray[urlArray.length - 2]
          }`}
        >
          {speciesRes.name}
        </Link>
      );
    }
    setSpecies(speciesArray);
  };

  useEffect(() => {
    apiRequest(film.characters, film.species);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.mainTitle}>
            Episode {film.episode_id}: {film.title}
          </p>
          <div className={styles.content}>
            <div className={styles.infoImageBlock}>
              <Image
                className={styles.infoImage}
                src={filmsArray[film.episode_id - 1]}
                sizes="100%"
                alt="info-image"
              />
            </div>
            <div className={styles.info}>
              <div className={styles.infoLine}>
                <p>
                  <b>Director:</b> {"Director" + film.director}
                </p>
              </div>
              <div className={styles.infoLine}>
                <p>
                  <b>Producer:</b> {film.producer}
                </p>
              </div>
              <div className={styles.infoLine}>
                <p>
                  <b>Release date:</b> {film.release_date}
                </p>
              </div>
              <div className={styles.infoLine}>
                <p>
                  <b>Opening crawl:</b> {film.opening_crawl}
                </p>
              </div>
              <div className={styles.infoLine}>
                {characters.length ? (
                  <p>
                    <b>Characters:</b> {characters}
                  </p>
                ) : (
                  <>
                    <b>Characters:</b> <div className={styles.loader}></div>
                  </>
                )}
              </div>
              <div className={styles.infoLine}>
                {species.length ? (
                  <p>
                    <b>Species:</b> {species}
                  </p>
                ) : (
                  <>
                    <b>Species:</b> <div className={styles.loader}></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const response = await fetch(`https://swapi.dev/api/films/${params.id}`);
  const film = await response.json();

  return {
    props: { film },
  };
};
