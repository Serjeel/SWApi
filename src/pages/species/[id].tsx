import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { ReactNode, useEffect, useState } from "react";
import styles from './species.module.css'
import Link from "next/link";

export default function CharacterId({ specie }:
    InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { query } = useRouter();

    const [homeworld, setHomeworld] = useState<string>('');
    const [films, setFilms] = useState<Array<ReactNode>>([]);
    const [characters, setCharacters] = useState<Array<ReactNode>>([]);

    const apiRequest = async (homeworldReq: any, filmsReq: any, charactersReq: any) => {
        if (homeworldReq) {
            let homeworldRes = await fetch(homeworldReq)
                .then(response => response.json())
                .then(data => { return data })
            setHomeworld(homeworldRes.name);
        } else {
            setHomeworld('n/a');
        }

        let filmsArray = [];

        for (let i = 0; i < filmsReq.length; i++) {
            let filmsRes = await fetch(filmsReq[i])
                .then(response => response.json())
                .then(data => { return data })

            const urlArray = filmsRes.url.split('/');

            filmsArray.push(
                <Link className={styles.link} href={`/${urlArray[urlArray.length - 3]}/${urlArray[urlArray.length - 2]}`}>
                    {filmsRes.title}
                </Link>
            );
        }
        setFilms(filmsArray);

        let charactersArray = [];

        for (let i = 0; i < charactersReq.length; i++) {
            let charactersRes = await fetch(charactersReq[i])
                .then(response => response.json())
                .then(data => { return data })

            const urlArray = charactersRes.url.split('/');

            charactersArray.push(
                <Link className={styles.link} href={`/${'characters'}/${urlArray[urlArray.length - 2]}`}>
                    {charactersRes.name}
                </Link>
            );
        }

        setCharacters(charactersArray);
    }

    useEffect(() => {
        apiRequest(specie.homeworld, specie.films, specie.people);
    }, [])

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <p className={styles.mainTitle}>{specie.name}</p>
                    <div className={styles.content}>
                        <div className={styles.infoImage}>
                            <p className={styles.missingImageText}>
                                There should have been a character image here,
                                but the api doesn't have it. And it takes a very
                                long time to search for 82 pictures with characters
                                and 37 pictures with species )))
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoLine}>Average height: {specie.average_height}</p>
                            <p className={styles.infoLine}>Classification: {specie.classification}</p>
                            <p className={styles.infoLine}>Designation: {specie.designation}</p>
                            <p className={styles.infoLine}>Average height: {specie.average_height}</p>
                            <p className={styles.infoLine}>Skin colors: {specie.skin_colors}</p>
                            <p className={styles.infoLine}>Hair colors: {specie.hair_colors}</p>
                            <p className={styles.infoLine}>Eye colors: {specie.eye_colors}</p>
                            <p className={styles.infoLine}>Average lifespan: {specie.average_lifespan}</p>
                            <p className={styles.infoLine}>Language: {specie.language}</p>
                            <p className={styles.infoLine}>Homeworld: {(homeworld || '...')}</p>
                            <p className={styles.infoLine}>Characters: {(characters || '...')}</p>
                            <p className={styles.infoLine}>Films: {(films || '...')}</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
};

export const getServerSideProps: GetServerSideProps =
    async ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

        const response = await fetch(`https://swapi.dev/api/species/${params.id}`)
        const specie = await response.json()

        return {
            props: { specie },
        }
    }
