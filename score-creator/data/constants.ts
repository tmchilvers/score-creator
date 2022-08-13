import { ISong } from "../redux/store/interfaces";
import data from "./songData.json";

// @ts-ignore
export const SONG_DATA: ISong[] = data;

export const SONGS: string[] = SONG_DATA.map((song) => song.songName);

//  ANIMATION DELAYS
export const START_UP_DELAY = 3100;
export const CHANGE_PAGE_DELAY = 800;
export const ENABLE_BUTTON_DELAY = 1000;
export const START_PAGE_CHANGE_DELAY = 500;
export const ZOOM_DELAY = 1000;
