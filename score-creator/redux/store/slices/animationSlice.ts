import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IAnimation } from "../interfaces";

//  Create an initial state for the Project
const initialState: IAnimation = {
  openPage: false,
  closePage: false,
};

//  Create the slice for the Project
export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setOpenPage: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.openPage = action.payload;
    },
    setClosePage: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.closePage = action.payload;
    },
  },
});

//  helper of project state for "useSelector" function
export const getAnimationState = (state: { animation: IAnimation }) =>
  state.animation;

//  export actions
export const { setOpenPage, setClosePage } = animationSlice.actions;

//  export reducer
export default animationSlice.reducer;
