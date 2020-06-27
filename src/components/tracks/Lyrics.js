import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";

export default function Lyrics(props) {
  const [track, setTrack] = useState();
  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        setLyrics({
          lyrics: res.data.message.body.lyrics,
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((res) => {
        setTrack({
          track: res.data.message.body.track,
        });
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  }
  return (
    <>
      {console.log(track)}
      <Link to="/" className="btn btn-dark btn-sm mb-4">
        Go Back
      </Link>
      <div className="card">
        <h5 className="card-header">
          {track.track.track_name} by
          <span className="text-secondary"> {track.track.artist_name}</span>
        </h5>
        <div className="card-body">
          <div className="card-text">{lyrics.lyrics.lyrics_body}</div>
        </div>
      </div>

      <ul className="list-group mt-3">
        <li className="list-group-item">
          <strong>Album ID</strong>: {track.track.album_id}
        </li>
        <li className="list-group-item">
          <strong>Song Genre</strong>:{" "}
          {track.track.primary_genres.music_genre_list.length === 0
            ? "NO GENRE AVAILABLE"
            : track.track.primary_genres.music_genre_list[0].music_genre
                .music_genre_name}
        </li>
        <li className="list-group-item">
          <strong>Explicit Words</strong>:{" "}
          {track.track.explicit === 0 ? "No" : "Yes"}
        </li>
        <li className="list-group-item">
          <strong>Album Name: </strong>: {track.track.album_name}
        </li>
      </ul>
    </>
  );
}
