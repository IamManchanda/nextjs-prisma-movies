import Head from "next/head";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import styles from "../assets/styles/Home.module.css";

const prisma = new PrismaClient();

function PageIndex({ movies }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.slug}`}>
              <a className={styles.card}>
                <h3>{movie.title} &rarr;</h3>
                <p>{movie.year}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const movies = await prisma.movie.findMany();
  return {
    props: { movies },
  };
}

export default PageIndex;
