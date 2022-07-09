import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { SONG_DATA } from "../../../data/constants";
import { IProject, Slides } from "../interfaces";

//  Create an initial state for the Project
const initialState: IProject = {
  projectId: 1,
  projectName: "My First Project",
  currSong: SONG_DATA[0],
  currSlide: "begin",
};

//  Create the slice for the Project
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSong: (
      state: Draft<typeof initialState>,
      action: PayloadAction<number>
    ) => {
      state.currSong = SONG_DATA[action.payload];
    },

    setSlide: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Slides>
    ) => {
      state.currSlide = action.payload;
    },
  },
});

//  helper of project state for "useSelector" function
export const getProjectState = (state: { project: IProject }) => state.project;

//  export actions
export const { setSong, setSlide } = projectSlice.actions;

//  export reducer
export default projectSlice.reducer;
