import React from "react";
import { connect } from "react-redux";
import AudioPlayer from "./Audio";
import TrackItem from "./TrackItem";
import { songs } from "./songs";
import { useState } from "react";

import { songSelect } from "../../state/app";

const Comp = (props) => {
  // console.log('songs:', songs);
  const [currentSongIndex, setCurrentSongIndex] = useState(
    props.currentSongNumber
  );
  const currentSong = songs[currentSongIndex];

  //set current song in redux
  const setCurrentSong = (index) => {
    setCurrentSongIndex(index);
    props.setCurrentSongNumber(index);
    console.log(index);
  };

  // console.log('C.S:', currentSong);
  return (
    <div className="not-prose border border-slate-800 rounded-lg my-10">
      <div className="container mx-auto p-6 flex-1">
        <ul>
          {songs.map((song, index) => (
            <TrackItem
              key={index}
              selected={index === currentSongIndex}
              title={song.title}
              trackNumberLabel={song.trackNumber}
              onClick={() => setCurrentSong(index)}
              link_url={song.src}
              trackTime={song.trackTime}
            />
          ))}
        </ul>
      </div>
      {currentSongIndex > -1 && (
        <AudioPlayer
          key={currentSongIndex}
          currentSong={currentSong}
          songCount={songs.length}
          songIndex={currentSongIndex}
          onNext={() => setCurrentSongIndex((i) => i + 1)}
          onPrev={() => setCurrentSongIndex((i) => i - 1)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentSongNumber: state.currentSongNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentSongNumber: (index) => dispatch(songSelect(index)),
    decrement: () => dispatch({ type: "DECREMENT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
