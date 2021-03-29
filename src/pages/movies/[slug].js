import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import styles from "../../assets/styles/Home.module.css";

const prisma = new PrismaClient();

function PageMoviesSlug({ movie }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{movie.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {movie.title} - {movie.year}
        </h1>

        <div className={styles.grid}>
          <p className={styles.description}>{movie.description}</p>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const movie = await prisma.movie.findUnique({
    where: {
      slug: params.slug,
    },
  });

  return {
    props: { movie },
  };
}

export default PageMoviesSlug;
