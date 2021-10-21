import { useState } from 'react'

function App() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [speech, setSpeech] = useState('')

  async function getJoke() {
    const apiUrl =
      'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist&type=single'
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      textToSpeech(data.joke)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    setIsButtonDisabled(true)
    getJoke()
  }

  const textToSpeech = (joke: string) => {
    const audioSrc = `http://api.voicerss.org/?key=${
      import.meta.env.VITE_API_KEY
    }&src=${joke}`
    setSpeech(audioSrc)
  }

  return (
    <div className="container">
      <button onClick={handleClick} id="button" disabled={isButtonDisabled}>
        Tell Me A Joke
      </button>
      {speech && (
        <audio
          onEnded={() => setIsButtonDisabled(false)}
          src={speech}
          id="audio"
          controls
          hidden
          autoPlay
        ></audio>
      )}
    </div>
  )
}

export default App
