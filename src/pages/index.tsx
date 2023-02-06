import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { ALL_CHARACTERS } from 'src/apollo/queries'
import FilmsImage from 'src/images/SWFilms.jpg'
import CharactersImage from 'src/images/SWCharacters2.jpg'
import SpeciesImage from 'src/images/SWSpecies2.png'
import ContentCard from '@/components/ContentCard'
import styles from '@/styles/Home.module.css'
import { style } from '@mui/system'

export default function Home() {
  //const { loading, error, data } = useQuery(ALL_CHARACTERS);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.item}>
            <Link href={'/films'}>
              <ContentCard variant='category' image={FilmsImage} name='Films'></ContentCard>
            </Link>
          </div>
          <div className={styles.item}>
            <Link href={'/characters'}>
              <ContentCard variant='category' image={CharactersImage} name='Characters'></ContentCard>
            </Link>
          </div>
          <div className={styles.item}>
            <Link href={'/species'}>
              <ContentCard variant='category' image={SpeciesImage} name='Species'></ContentCard>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
