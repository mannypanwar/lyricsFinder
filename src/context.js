import React, { useState, useEffect } from "react";
import axios from "axios";

export const Context = React.createContext();

export default function Provider(props) {
  let initial_state = {
    track_list: [],
    heading: "Top 10 Tracks",
  };

  const [state, setState] = useState(initial_state);

  // https://cors-anywhere.herokuapp.com/
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        // console.log(res.data),
        setState({
          track_list: res.data.message.body.track_list,
          heading: "Top 10 Tracks",
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Context.Provider value={[state, setState]}>
      {props.children}
    </Context.Provider>
  );
}

export const Consumer = Context.Consumer;
