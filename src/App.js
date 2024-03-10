import React, { useState, useEffect } from "react";
import "./App.css";
const translate = require('google-translate-api');

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [note, setNote] = useState(null);
  const [translatedNote, setTranslatedNote] = useState(null);
  const [notesStore, setNotesStore] = useState([]);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const microphone = new SpeechRecognition();

  microphone.continuous = true;
  microphone.interimResults = true;
  microphone.lang = "en-US";

  const storeNote = () => {
    setNotesStore([...notesStore, translatedNote || note]);
    setNote("");
    setTranslatedNote("");
  };

  const startRecordController = () => {
    if (isRecording) {
      microphone.start();
      microphone.onend = () => {
        console.log("continue..");
        microphone.start();
      };
    } else {
      microphone.stop();
      microphone.onend = () => {
        console.log("Stopped microphone on Click");
      };
    }
    microphone.onstart = () => {
      console.log("microphones on");
    };

    microphone.onresult = (event) => {
      const recordingResult = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(recordingResult);
      setNote(recordingResult);
      translateText(recordingResult);
      microphone.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  useEffect(() => {
    startRecordController();
  }, [isRecording]);

  const translateText = async (text) => {
    try {
      const translation = await translate(text, { to: 'en' });
      setTranslatedNote(translation.text);
    } catch (error) {
      console.error("Error translating text:", error);
      setTranslatedNote(text);
    }
  };

  return (
    <>
      <h1>Record Voice Notes</h1>
      <div>
        <div className="noteContainer">
          <h2>Record Note Here</h2>
          {isRecording ? <span>Recording... </span> : <span>Stopped </span>}
          <button className="button" onClick={storeNote} disabled={!note}>
            Save
          </button>
          <button onClick={() => setIsRecording((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
          <p>{translatedNote}</p>
        </div>
        <div className="noteContainer">
          <h2>Notes Store</h2>
          {notesStore.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
