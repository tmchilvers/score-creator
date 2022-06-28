import { Box, ButtonGroup, CircularProgress } from "@mui/material";
import MusicPlayer from "../pages/musicPlayer";
import { Slides } from "../redux/store/interfaces";
import { setSlide, setSong } from "../redux/store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { StyledButton } from "./begin";

const SelectSong = () => {
  const currSong = useAppSelector((state) => state.project.currSong);
  const dispatch = useAppDispatch();

  const changeSong = (id: number) => {
    dispatch(setSong(id));
  };

  const changeSlide = (slide: Slides) => {
    dispatch(setSlide(slide));
  };

  //  stop if the song is not loaded
  if (currSong === null) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <StyledButton onClick={() => changeSong(0)}>
            Change to Blues 101
          </StyledButton>
          <StyledButton onClick={() => changeSong(1)}>
            Change to Sad Cinematic
          </StyledButton>
        </ButtonGroup>
        <p>Playing "{currSong!.songName}". . .</p>
        <MusicPlayer song={currSong} />
      </Box>
      <StyledButton onClick={() => changeSlide("begin")}>BACK</StyledButton>
    </>
  );
};

export default SelectSong;
