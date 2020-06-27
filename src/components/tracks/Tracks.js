import React, { useContext } from "react";
import Spinner from "../Layout/Spinner";
import Track from "../tracks/Track";
import { Context } from "../../context";

export default function Tracks() {
  const [state] = useContext(Context);
  const { track_list, heading } = state;

  if (track_list === undefined || track_list.length === 0) {
    return <Spinner />;
  }
  {
    return (
      <>
        <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">
          {track_list.map((item) => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    );
  }
}
