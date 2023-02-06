import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import styles from "@/styles/globalStyles.module.css";

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
          href={`/${urlArray[urlArray.length - 3]}/${urlArray[urlArray.length - 2]
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
          href={`/${urlArray[urlArray.length - 3]}/${urlArray[urlArray.length - 2]
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
            <div className={styles.infoImageBlock}>
              <p className={styles.missingImageText}>
                There should have been a character image here, but the api
                doesn't have it. And it takes a very long time to search for 82
                pictures with characters and 37 pictures with species )))
              </p>
            </div>
            <div className={styles.info}>
              <div className={styles.infoLine}>
                <p><b>Height: </b>
                  {character.height}</p>
              </div>
              <div className={styles.infoLine}>
                <p><b>Mass: </b>
                  {character.mass}</p>
              </div>
              <div className={styles.infoLine}>
                <p><b>Hair color: </b> {character.hair_color}</p>
              </div>
              <div className={styles.infoLine}>
                <p><b>Skin holor: </b> {character.skin_color}</p>
              </div>
              <div className={styles.infoLine}>
                <p><b>Eye holor: </b> {character.eye_color}</p>
              </div>
              <div className={styles.infoLine}>
                <p><b>Gender: </b>
                  {character.gender}</p>
              </div>
              <div className={styles.infoLine}>
                <p><b>Homeworld: </b>
                  {homeworld}</p>
              </div>
              <div className={styles.infoLine}>
                <p><b>Specie: </b>
                  {specie} </p>
              </div>
              <div className={styles.infoLine}>
                {films.length ?
                  <p><b>Films: </b>{films}</p>
                  : <><b>Films:</b> <div className={styles.loader}></div></>
                }
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
  const response = await fetch(`https://swapi.dev/api/people/${params.id}`);
  const character = await response.json();

  return {
    props: { character },
  };
};
