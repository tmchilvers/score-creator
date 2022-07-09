import styled from "@emotion/styled";

const MusicNoteAnim = ({
  transform,
  margin,
}: {
  transform: string;
  margin: string;
}) => {
  return (
    <StyledMusicNote
      type="image/svg+xml"
      data="/svgs/MusicNote.svg"
      transform={transform}
      margin={margin}
    ></StyledMusicNote>
  );
};

export default MusicNoteAnim;

const StyledMusicNote = styled.object<{ transform: string; margin: string }>`
  position: absolute;
  width: 5%;

  margin-left: ${({ margin }) => `${margin}vw`};
  transform: ${({ transform }) => transform};

  animation: fadeIn 0.5s linear;
`;
