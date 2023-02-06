import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import styles from "./characters.module.css";

export default function CharacterId({
  character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter();

  const [homeworld, setHomeworld] = useState<string>("");
  const [films, setFilms] = useState<Array<ReactNode>>([]);
  const [specie, setSpecie] = useState<ReactNode>("");

  const apiRequest = async (
    homeworldReq: any,
    filmsReq: any,
    specieReq: any
  ) => {
    let homeworldRes = await fetch(homeworldReq)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    setHomeworld(homeworldRes.name);

    let filmsArray = [];

    for (let i = 0; i < filmsReq.length; i++) {
      let filmsRes = await fetch(filmsReq[i])
        .then((response) => response.json())
        .then((data) => {
          return data;
        });

      const urlArray = filmsRes.url.split("/");

      filmsArray.push(
        <Link
          key={`character-${i}`}
          className={styles.link}
          href={`/${urlArray[urlArray.length - 3]}/${
            urlArray[urlArray.length - 2]
          }`}
        >
          {filmsRes.title}
        </Link>
      );
    }

    setFilms(filmsArray);

    if (specieReq[0]) {
      let specieRes = await fetch(specieReq[0])
        .then((response) => response.json())
        .then((data) => {
          return data;
        });

      const urlArray = specieRes.url.split("/");

      setSpecie(
        <Link
          className={styles.link}
          href={`/${urlArray[urlArray.length - 3]}/${
            urlArray[urlArray.length - 2]
          }`}
        >
          {specieRes.name}
        </Link>
      );
    } else {
      setSpecie(
        <Link className={styles.link} href={`/species/1`}>
          {"Human"}
        </Link>
      );
    }
  };

  useEffect(() => {
    apiRequest(character.homeworld, character.films, character.species);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.mainTitle}>{character.name}</p>
          <div className={styles.content}>
            <div className={styles.infoImage}>
              <p className={styles.missingImageText}>
                There should have been a character image here, but the api
                doesn't have it. And it takes a very long time to search for 82
                pictures with characters and 37 pictures with species )))
              </p>
            </div>
            <div className={styles.info}>
              <p className={styles.infoLine}>Height: {character.height}</p>
              <p className={styles.infoLine}>Mass: {character.mass}</p>
              <p className={styles.infoLine}>
                Hair color: {character.hair_color}
              </p>
              <p className={styles.infoLine}>
                Skin holor: {character.skin_color}
              </p>
              <p className={styles.infoLine}>
                Eye holor: {character.eye_color}
              </p>
              <p className={styles.infoLine}>Gender: {character.gender}</p>
              <p className={styles.infoLine}>Specie: {specie}</p>
              <p className={styles.infoLine}>Homeworld: {homeworld}</p>
              <p className={styles.infoLine}>Films: {films}</p>
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
  const response = await fetch(`https://swapi.dev/api/people/${params.id}`);
  const character = await response.json();

  return {
    props: { character },
  };
};
