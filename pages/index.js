import Head from 'next/head'
import styles from '../styles/Home.module.css'
import verbsData from '../data/verbs';

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function Home({ verbs = [] }) {
  const router = useRouter();
  const [hasSpeech, setHasSpeech] = useState(false)
  const [synth, setSynth] = useState(null)

  const talk = (text) => {
    let utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    if (synth) {

      synth.speak(utter);
    }
  }

  useEffect(() => {
    if (window) {
      setHasSpeech(!!window.speechSynthesis);
      setSynth(window.speechSynthesis);
    }
  }, [])

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
                      <p onClick={() => talk(verb)} lang="en-US"><strong>{verb}</strong></p>
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
  const verbs = verbsData;
  return {
    props: { verbs }
  }
}