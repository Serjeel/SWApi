import Head from 'next/head'
import Link from 'next/link'
import { Card, CardContent, IconButton, Typography } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import styles from '@/styles/ContentCard.module.css'

interface IContentCardProps {
    variant: string;
    image: StaticImageData;
    name: string;
}

export default function ContentCard({ variant, image, name }: IContentCardProps) {

    return (
        <>
            <IconButton>
                <div className={variant === 'category' ? styles.categoryCard :
                    styles.filmCard}>
                    <div className={styles.content}>
                        <Image className={variant === 'category' ? styles.categoryCardImage :
                            styles.filmCardImage}
                            sizes='100%'
                            src={image}
                            alt={name} />
                        <p className={styles.name}>{name}</p>
                    </div>
                </div>
            </IconButton>
        </>
    )
}
