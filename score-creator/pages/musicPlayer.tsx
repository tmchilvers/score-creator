import { CircularProgress } from "@mui/material";
import { useEffect, useRef } from "react";
import { ISection, ISong } from "../redux/store/interfaces";

const MusicPlayer = (song: ISong) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!audioRef || !song) {
    return <CircularProgress color="inherit" />;
  }

  //  Grab Sections for current song
  const showSections = () => {
    let sections: ISection[] = [];
    song.stems!.forEach((stem) => {
      stem.sections!.forEach((s) => sections.push(s));
    });
    return (
      <>
        {sections.map((s) => {
          audioRef.current?.load();
          return (
            <>
              <h3>
                {song.songName} - {s.sectionName}
              </h3>
              <audio controls ref={audioRef}>
                <source
                  src={`https://cloudflare-ipfs.com/ipfs/${s.IPFS_CID}`}
                  type="audio/wav"
                />
                Your browser does not support the audio tag.
              </audio>
            </>
          );
        })}
      </>
    );
  };

  return <>{showSections()}</>;
};

export default MusicPlayer;
