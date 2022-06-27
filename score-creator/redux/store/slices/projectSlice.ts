import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { songData } from "../../../data/constants";
import { IProject } from "../interfaces";

//  Create an initial state for the Project
const initialState: IProject = {
  projectId: 1,
  projectName: "My First Project",
  currSong: songData[0],
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
      state.currSong = songData[action.payload];
    },
  },
});

//  helper of project state for "useSelector" function
export const getProjectState = (state: { project: IProject }) => state.project;

//  export actions
export const { setSong } = projectSlice.actions;

//  export reducer
export default projectSlice.reducer;