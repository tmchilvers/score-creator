import { SONG_DATA } from "./constants";

type songNamesIds = {
  [songName: string]: number;
};

export const getSongNamesAndIds = () => {
  const songNamesIds: songNamesIds = {};
  SONG_DATA.map((song) => (songNamesIds[song.songName] = song.songId));
  return songNamesIds;
};
