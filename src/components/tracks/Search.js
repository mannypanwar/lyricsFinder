import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context";

export default function Search() {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState();

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        let track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" });
      })
      .catch((err) => console.log(err));
  }, [trackTitle]);

  function findTrack(e) {
    e.preventDefault();
    setTrackTitle(userInput);
  }

  function onChange(e) {
    setUserInput(e.target.value);
  }

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music"></i> Search for a song
      </h1>
      <p className="lead text-center">Get the lyrics of anysong</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title .."
            name="trackTitle"
            autoComplete="off"
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
}
