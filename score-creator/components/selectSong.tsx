import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { getSongNamesAndIds } from "../data/utils";
import { Slides } from "../redux/store/interfaces";
import {
  setClosePage,
  setOpenPage,
} from "../redux/store/slices/animationSlice";
import { setSlide, setSong } from "../redux/store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { StyledButton } from "./styles";

const SelectSong = () => {
  const currSong = useAppSelector((state) => state.project.currSong);
  const animOpenPage = useAppSelector((state) => state.animation.openPage);
  const animClosePage = useAppSelector((state) => state.animation.closePage);
  const dispatch = useAppDispatch();

  const changeSong = (id: number) => {
    dispatch(setSong(id));
  };

  const changeSlide = (slide: Slides) => {
    if (animOpenPage || animClosePage) return;
    dispatch(setClosePage(true));

    setTimeout(() => {
      dispatch(setClosePage(false));
      dispatch(setOpenPage(true));
      dispatch(setSlide(slide));
    }, 1000);
  };

  //  stop if the song is not loaded
  if (currSong === null) {
    return <CircularProgress color="inherit" />;
  }

  const songNamesAndIds = getSongNamesAndIds();

  return (
    <>
      <StyledSongSelectionWrapper data-cy="song-selection-wrapper">
        <StyledSongFilter data-cy="song-filter">
          <StyledButton>Filter</StyledButton>
        </StyledSongFilter>
        <StyledSongSelection data-cy="song-selection">
          <StyledButtonGroup data-cy="button-group">
            {Object.keys(songNamesAndIds).map((name) => (
              <StyledButton onClick={() => changeSong(songNamesAndIds[name])}>
                {name}
              </StyledButton>
            ))}
          </StyledButtonGroup>
        </StyledSongSelection>
        <StyledButton onClick={() => changeSlide("begin")}>BACK</StyledButton>
      </StyledSongSelectionWrapper>
    </>
  );
};

export default SelectSong;

const StyledSongFilter = styled.div``;

const StyledButtonGroup = styled.div`
  padding: 2%;
  display: flex;
  gap: 2vw;
  justify-content: center;

  button {
    color: #febfb8;
    background-color: white;
    height: 3vw;
    width: 10vw;
    border-radius: 15px;
  }
`;

const StyledSongSelection = styled.div`
  background-color: #ffffff47;
  border-radius: 15px;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
}
`;

const StyledSongSelectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  justify-items: center;
  grid-template-columns: 100%;
  grid-template-rows: 10% 75% 15%;
  align-items: center;
`;
