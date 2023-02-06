import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import ContentCard from '@/components/ContentCard'
import { ALL_FILMS } from 'src/apollo/queries'
import Episode1Image from 'src/images/SWEp1.jpg'
import Episode2Image from 'src/images/SWEp2.jpg'
import Episode3Image from 'src/images/SWEp3.jpg'
import Episode4Image from 'src/images/SWEp4.jpg'
import Episode5Image from 'src/images/SWEp5.jpg'
import Episode6Image from 'src/images/SWEp6.jpg'
import CharactersImage from 'src/images/SWCharacters2.jpg'
import SpeciesImage from 'src/images/SWSpecies2.png'
import styles from './films.module.css'

export default function Films() {
  const { data } = useQuery(ALL_FILMS);
  const filmsArray = [Episode4Image, Episode5Image, Episode6Image,
    Episode1Image, Episode2Image, Episode3Image]

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          {data && data.allFilms.films.map((film: any, i: any) =>
            <div className={styles.item}>
              <Link href={`/films/${i + 1}`}>
                <ContentCard variant='film' image={filmsArray[i]} name={film.title}></ContentCard>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
