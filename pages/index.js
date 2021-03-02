import Head from 'next/head'
import styles from '../styles/Home.module.css'
import verbsData from '../data/verbs';

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';


const Word = ({text, ...props}) =>{
  return <button className='word-button' lang="en-US" {...props}>{text} <FiVolume2 /></button>
}

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

  const breakWords = (words) => {
    return words.split(' / ')
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
          <p>Touch the words to hear</p>
        )}
      </header>

      <main>
        {
          verbs.map(([letterGroup, groupVerbs]) => (
            <section key={`section-${letterGroup}`}>
              <h2>{letterGroup}</h2>
              <ul>

                {
                  groupVerbs.map(({ verb, sp, pp }, vIndex) => (
                    <li key={verb}>
                      <p onClick={() => talk(verb)} lang="en-US"><strong className="verb">{verb} <FiVolume2 /></strong></p>
                      <p>Simple Past: {breakWords(sp).map((word, wIndex)=>(<Word key={`${vIndex}-${wIndex}-${word}`} text={word} onClick={() => talk(word)} />))}</p>
                      <p>Past Participle: {breakWords(pp).map((word, wIndex)=>(<Word key={`${vIndex}-${wIndex}-${word}`} text={word} onClick={() => talk(word)} />))}</p>
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