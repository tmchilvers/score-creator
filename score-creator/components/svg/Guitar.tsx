import styled from "@emotion/styled";

const Guitar = ({}: {}) => {
  return (
    <StyledMusicNote
      type="image/svg+xml"
      data="/svgs/Guitar.svg"
    ></StyledMusicNote>
  );
};

export default Guitar;

const StyledMusicNote = styled.object``;
