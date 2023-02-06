import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { ALL_SPECIES } from 'src/apollo/queries'
import styles from './species.module.css'

export default function Species() {
  const { data } = useQuery(ALL_SPECIES);
  console.log(data);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.characters}>
          {data && data.allSpecies.species.map((specie: any, i: any) =>
            <>
              <Link href={`/species/${i + 1}`}>
                <p className={styles.name}>{specie.name}</p>
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  )
}
