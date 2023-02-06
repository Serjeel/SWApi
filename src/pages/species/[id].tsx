import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import styles from "@/styles/globalStyles.module.css";

export default function CharacterId({
    specie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { query } = useRouter();

    const [homeworld, setHomeworld] = useState<string>("");
    const [films, setFilms] = useState<Array<ReactNode>>([]);
    const [characters, setCharacters] = useState<Array<ReactNode>>([]);

    const apiRequest = async (
        homeworldReq: any,
        filmsReq: any,
        charactersReq: any
    ) => {
        if (homeworldReq) {
            let homeworldRes = await fetch(homeworldReq)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });
            setHomeworld(homeworldRes.name);
        } else {
            setHomeworld("n/a");
        }

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
                    key={`film-${i}`}
                    className={styles.link}
                    href={`/${urlArray[urlArray.length - 3]}/${urlArray[urlArray.length - 2]
                        }`}
                >
                    {filmsRes.title}
                </Link>
            );
        }
        setFilms(filmsArray);

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
                    href={`/${"characters"}/${urlArray[urlArray.length - 2]}`}
                >
                    {charactersRes.name}
                </Link>
            );
        }

        setCharacters(charactersArray);
    };

    useEffect(() => {
        apiRequest(specie.homeworld, specie.films, specie.people);
    }, []);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <p className={styles.mainTitle}>{specie.name}</p>
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
                                <p><b>Average height: </b> {specie.average_height}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b>Classification:</b> {specie.classification}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b>Designation:</b> {specie.designation}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b>Average height:</b> {specie.average_height}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b>Skin colors:</b> {specie.skin_colors}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b> Hair colors:</b> {specie.hair_colors}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b>Eye colors:</b> {specie.eye_colors}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b> Average lifespan:</b> {specie.average_lifespan}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b>Language:</b> {specie.language}</p>
                            </div>
                            <div className={styles.infoLine}>
                                <p><b>Homeworld:</b> {homeworld}</p>
                            </div>
                            <div className={styles.infoLine}>
                                {characters.length ?
                                    <p><b>Characters: </b>{characters}</p>
                                    : <><b>Characters:</b> <div className={styles.loader}></div></>
                                }
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
    const response = await fetch(`https://swapi.dev/api/species/${params.id}`);
    const specie = await response.json();

    return {
        props: { specie },
    };
};
