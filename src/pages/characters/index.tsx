import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { ALL_CHARACTERS } from 'src/apollo/queries'
import styles from './characters.module.css'

export default function characters() {
  const { data } = useQuery(ALL_CHARACTERS);
  console.log(data);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.characters}>
          {data && data.allCharacters.characters.map((character: any, i: any) =>
            <>
              <Link href={`/characters/${i + 1}`}>
                <p className={styles.name}>{character.name}</p>
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  )
}
