import { Box, Button, ButtonGroup, CircularProgress } from "@mui/material";
import { setSong } from "../redux/store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import MusicPlayer from "./musicPlayer";

const ScoreCreator = () => {
  //  Grab initial song from Redux Project State
  const currSong = useAppSelector((state) => state.project.currSong);
  const dispatch = useAppDispatch();

  const changeSong = (id: number) => {
    dispatch(setSong(id));
  };

  //  stop if the song is not loaded
  if (currSong === null) {
    return <CircularProgress color="inherit" />; // have a loading spinner here;
  }

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <h1>Score Creator</h1>

      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button onClick={() => changeSong(0)}>Change to Blues 101</Button>
        <Button onClick={() => changeSong(1)}>Change to Sad Cinematic</Button>
      </ButtonGroup>
      <p>Playing "{currSong!.songName}". . .</p>
      <MusicPlayer {...currSong} />
    </Box>
  );
};

export default ScoreCreator;
