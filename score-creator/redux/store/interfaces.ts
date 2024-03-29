//  =====================================================================================
//  PROJECT INTERFACE
export type Slides = "begin" | "selectSong";

export interface IProject {
  projectId: number;
  projectName: string;
  currSong: ISong;
  currSlide: Slides;
}

//  =====================================================================================
//  SONG INTERFACES
export type Instruments =
  | "piano"
  | "guitar"
  | "drums"
  | "bass"
  | "strings"
  | "brass"
  | "winds"
  | "perc"
  | "synths"
  | "vocals"
  | "misc";

export interface ISong {
  songId: number;
  songName: string;
  bpm: number;
  instruments: Instruments[] | null;
  stems: IStem[] | null;
  IPFS_CID: string;
}

export interface IStem {
  stemId: number;
  stemName: string;
  sections: ISection[] | null;
}

export interface ISection {
  sectionId: number;
  stemId: number;
  sectionName: string;
  IPFS_CID: string;
}

//  =====================================================================================
//  SONG INTERFACES
export interface IAnimation {
  openPage: boolean;
  closePage: boolean;
}
