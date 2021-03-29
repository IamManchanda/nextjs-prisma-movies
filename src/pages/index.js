import Head from "next/head";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../assets/styles/Home.module.css";

const prisma = new PrismaClient();

function PageIndex({ moviesData }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [movies, setMovies] = useState(moviesData);

  async function saveMovie(event) {
    event.preventDefault();
    setMovies([...movies, formData]);
    const response = await fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const newMovie = await response.json();
    router.push(`/movies/${newMovie.slug}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.gridCell}>
            <form className={styles.movieForm} onSubmit={saveMovie}>
              <h3 className={styles.movieFormTitle}>Add a Movie</h3>
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    title: event.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Year"
                name="year"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    year: Number(event.target.value),
                  })
                }
              />
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="Description"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description: event.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Slug"
                name="slug"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    slug: event.target.value,
                  })
                }
              />
              <button type="submit">Add movie</button>
            </form>
          </div>

          <div className={styles.gridCell}>
            {moviesData.map(({ id, slug, title, year }) => (
              <Link key={id} href={`/movies/${slug}`}>
                <a className={styles.card}>
                  <h3>{title} &rarr;</h3>
                  <p>{year}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const moviesData = await prisma.movie.findMany();
  return {
    props: {
      moviesData: moviesData.reverse(),
    },
  };
}

export default PageIndex;
