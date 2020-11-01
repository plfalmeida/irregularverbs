import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router'

export default function Home({ verbs = [] }) {
  const router = useRouter();

  const hasSpeech = !!window.speechSynthesis;

  const talk = (text) => {
    const synth = window.speechSynthesis;
    let utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    synth.speak(utter);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Irregular Verbs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.main}>
        <h1 className={styles.title}>
          Irregular Verbs
        </h1>
        {hasSpeech && (
          <p>Touch the words to listen</p>
        )}
      </header>

      <main>
        {
          verbs.map(([letterGroup, groupVerbs]) => (
            <section key={`section-${letterGroup}`}>
              <h2>{letterGroup}</h2>
              <ul>

                {
                  groupVerbs.map(({ verb, sp, pp }) => (
                    <li key={verb}>
                      <p onClick={() => talk(verb)}><strong>{verb}</strong></p>
                      <p onClick={() => talk(sp)}>Simple Past: {sp}</p>
                      <p onClick={() => talk(pp)}>Past Participle: {pp}</p>
                      <p><a href={`https://www.onelook.com/?loc=pub&w=${verb}`} target="_blank">definitions</a></p>
                    </li>
                  ))
                }
              </ul>
            </section>
          ))
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
        >
          Powered by{' '}
          Pedro Almeida
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://irregularverbs.vercel.app/api/verbs');
  const verbs = await response.json();
  return {
    props: { verbs }
  }
}