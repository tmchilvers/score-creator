import styled from "@emotion/styled";
import { Piano } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PianoIcon from "@mui/icons-material/Piano";
import PauseIcon from "@mui/icons-material/Pause";
import Guitar from "./svg/Guitar";
import {
  CircularProgress,
  Grow,
  SpeedDial,
  SpeedDialAction,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CHANGE_PAGE_DELAY, SONGS, SONG_DATA } from "../data/constants";
import {
  capitalizeFirstLetter,
  changeSlide,
  getSongNamesAndIds,
} from "../data/utils";
import { Slides } from "../redux/store/interfaces";
import {
  setClosePage,
  setOpenPage,
} from "../redux/store/slices/animationSlice";
import { setSlide, setSong } from "../redux/store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { StyledButton } from "../styles/styles";
import FadeWord from "./animations/fadeWord";
import MusicButton from "./animations/musicButton";

interface IOpenInstrumentsData {
  show: boolean;
  visible: boolean;
  hovering: boolean;
}

interface IOpenInstruments {
  [songName: string]: IOpenInstrumentsData;
}

const SelectSong = () => {
  const [openInstruments, setOpenInstruments] = useState<IOpenInstruments>({});
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currSongName, setCurrSongName] = useState("");
  const [audio, setAudio] = useState<HTMLAudioElement>();

  const currSong = useAppSelector((state) => state.project.currSong);
  const dispatch = useAppDispatch();
  const animOpenPage = useAppSelector((state) => state.animation.openPage);
  const animClosePage = useAppSelector((state) => state.animation.closePage);

  const songNamesAndIds = getSongNamesAndIds();

  const changeSong = (id: number) => {
    dispatch(setSong(id));
  };

  //  ---------------------------------------------------------------------------------
  //  PLAY SONG

  const playAudio = (songName: string) => {
    if (songName === currSongName) {
      if (audioPlaying) {
        audio!.pause();
        setAudioPlaying(false);
      } else {
        audio!.play();
        setAudioPlaying(true);
      }
    } else {
      if (audioPlaying) {
        audio!.pause();
        setAudioPlaying(false);
      }

      let newAudio = new Audio(
        `https://cloudflare-ipfs.com/ipfs/${
          SONG_DATA[songNamesAndIds[songName]].IPFS_CID
        }`
      );

      if (currSongName) {
        openInstruments[currSongName].hovering = false;
      }
      setAudio(newAudio);
      setCurrSongName(songName);
      newAudio.play();
      setAudioPlaying(true);
    }
  };

  const setIsHovering = (songName: string) => {
    if (currSongName === songName && audioPlaying) {
      return;
    }

    const defaultOpenInstruments = { ...openInstruments };
    defaultOpenInstruments[songName].hovering =
      !openInstruments[songName].hovering;

    setOpenInstruments(defaultOpenInstruments);
  };

  //  ---------------------------------------------------------------------------------
  //  SHOW INSTRUMENTS

  useEffect(() => {
    const defaultOpenInstruments: IOpenInstruments = {};
    SONGS.forEach(
      (song) =>
        (defaultOpenInstruments[song] = {
          show: false,
          visible: false,
          hovering: false,
        })
    );
    setOpenInstruments(defaultOpenInstruments);
  }, []);

  const toggleInstruments = (songName: string) => {
    const defaultOpenInstruments = { ...openInstruments };
    defaultOpenInstruments[songName].show = !openInstruments[songName].show;
    defaultOpenInstruments[songName].visible = true;

    setOpenInstruments(defaultOpenInstruments);
  };

  const hideInstruments = (songName: string) => {
    const defaultOpenInstruments = { ...openInstruments };
    defaultOpenInstruments[songName].visible = false;

    setOpenInstruments(defaultOpenInstruments);
  };

  //  stop if the song is not loaded
  if (currSong === null || !Object.keys(openInstruments).length) {
    return <CircularProgress color="inherit" />;
  }

  //  ---------------------------------------------------------------------------------
  //  SONG ACTIONS

  const actions = [
    {
      icon: <HeadphonesIcon htmlColor="#febfb5" />,
      name: "Listen",
    },
    {
      icon: <PianoIcon htmlColor="#febfb5" />,
      name: "Instruments",
    },
    {
      icon: <AddIcon htmlColor="#febfb5" />,
      name: "Play in Score Creator",
    },
  ];

  const handleClick = ({
    button,
    songName,
  }: {
    button: string;
    songName: string;
  }) => {
    switch (button) {
      case "Listen":
        playAudio(songName);
        break;

      case "Instruments":
        toggleInstruments(songName);
        break;

      case "Play in Score Creator":
        changeSong(songNamesAndIds[songName]);
        break;

      default:
        break;
    }
  };

  //  ---------------------------------------------------------------------------------
  //  MAIN

  return (
    <>
      <StyledSongSelectionWrapper data-cy="song-selection-wrapper">
        <StyledSongSelection data-cy="song-selection">
          {Object.keys(songNamesAndIds).map((songName) => (
            <>
              <StyledSpeedDial
                ariaLabel={songName}
                direction="right"
                icon={songName}
                onMouseOver={() => setIsHovering(songName)}
                onMouseOut={() => setIsHovering(songName)}
                open={
                  (currSongName === songName && audioPlaying) ||
                  openInstruments[songName]!.hovering ||
                  openInstruments[songName]!.show
                }
                darkenListen={currSongName === songName && audioPlaying}
                darkenInstruments={openInstruments[songName]?.show}
              >
                <StyledSpeedDialBackground />
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() =>
                      handleClick({ button: action.name, songName: songName })
                    }
                  />
                ))}
              </StyledSpeedDial>
              <Zoom
                in={openInstruments[songName]?.show}
                timeout={500}
                style={{
                  display: openInstruments[songName]?.visible ? "" : "none",
                }}
                onExited={() => hideInstruments(songName)}
              >
                <StyledInstruments>
                  {SONG_DATA[songNamesAndIds[songName]].instruments!.map(
                    (instrument) => (
                      <Grow in={true} timeout={2000}>
                        <span>{capitalizeFirstLetter(instrument)}</span>
                      </Grow>
                    )
                  )}
                </StyledInstruments>
              </Zoom>
            </>
          ))}
        </StyledSongSelection>
        <StyledSongConfirm data-cy="song-confirm">
          <span>
            <FadeWord word={currSong.songName} />
          </span>
        </StyledSongConfirm>
        <StyledButtonWrapper data-cy="button-wrapper">
          <StyledButton
            onClick={() =>
              changeSlide(dispatch, animOpenPage, animClosePage, "begin")
            }
          >
            BACK
          </StyledButton>
          <MusicButton
            text={"CONFIRM"}
            clickFunc={changeSlide}
            dispatch={dispatch}
            animOpenPage={animOpenPage}
            animClosePage={animClosePage}
            slide="playground"
          ></MusicButton>
        </StyledButtonWrapper>
      </StyledSongSelectionWrapper>
    </>
  );
};

export default SelectSong;

const StyledSongSelection = styled.div`
  background-color: #ffffff47;
  border-radius: 15px;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1vw;
  padding: 1vw;
}
`;

const StyledSongConfirm = styled.div`
  background-color: #6d6868;
  border-radius: 15px;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  padding: 1vw;
  align-items: center;
}
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 2vw;
`;

const StyledSongSelectionWrapper = styled.div`
  width: 30vw;
  height: 100%;
  display: grid;
  overflow: hidden;
  justify-items: center;
  grid-template-columns: 100%;
  grid-template-rows: 70% 10% 20%;
  align-items: center;
`;

const StyledSpeedDial = styled(SpeedDial)<{
  darkenListen: boolean;
  darkenInstruments: boolean;
}>`
  > button {
    border-radius: 15px;
    padding: 1vw;
    width: 13vw;
    height: 2vw;

    border: 0.1vw solid white;
    border-radius: 10px;
    color: white;
    font-size: 1vw;
    background-color: transparent;

    &:hover {
      background-color: white;
      color: #febfb5;
    }

    &[aria-expanded="true"] {
      background-color: white;
      color: #febfb5;
    }
  }

  .MuiSpeedDial-actions {
    button:hover,
    [aria-label="Listen"] {
      background-color: #6d6868;
      svg {
        color: white;
      }
    }

    [aria-label="Listen"] {
      background-color: ${({ darkenListen }) =>
        darkenListen ? "#6d6868" : "white"};
      svg {
        color: ${({ darkenListen }) => (darkenListen ? "white" : "#febfb5")};
      }
    }

    [aria-label="Instruments"] {
      background-color: ${({ darkenInstruments }) =>
        darkenInstruments ? "#6d6868" : "white"};
      svg {
        color: ${({ darkenInstruments }) =>
          darkenInstruments ? "white" : "#febfb5"};
      }
    }
  }

  button {
    box-shadow: none;

    &:active {
      box-shadow: none;
    }
  }
`;

const StyledSpeedDialBackground = styled.div`
  width: 11.3vw;
  height: 2.2vw;
  background-color: #ffffff3b;
  border-radius: 15px;
  position: absolute;
`;

const StyledInstruments = styled.div`
  background-color: #ffffff47;
  border-radius: 15px;
  height: 2vw;
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  padding: 0.1vw 1.1vw;

  span,
  svg {
    color: white;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.2vw;
  }
`;
