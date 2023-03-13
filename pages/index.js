import Head from "next/head";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import styles from "./index.module.css";

// --- Set somewhere else but within scope
const url = "some url";
let progress = 0;
const maxTime = 5000; // 5 seconds
let interval = null;

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [lastAnimalInput, setLastAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let [loading, setLoading] = useState(true);
  //let [color, setColor] = useState("#ffffff");

  async function onSubmit(event) {
    event.preventDefault();
    // disable submit button
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: anim alInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.result);
      setLastAnimalInput(animalInput);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    // re-enable submit button
    setIsSubmitting(false);

  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') {onSubmit(e)}}}
          />
          {/*<input type="submit" value="Generate names" disabled={isSubmitting}/>*/}
          {isSubmitting ? (
            <PacmanLoader color="#36d7b7" />
              ) : (
              <button type="submit">Generate names</button>
              )}
        </form>
        <div className={styles.result}>{lastAnimalInput}:{result}</div>
      </main>
    </div>
  );
}
