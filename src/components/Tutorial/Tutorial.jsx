import ReactPlayer from "react-player";
import { BodyContainer, Container, VideoTitle } from "./Tutorial.styled";

const Tutorial = () => {
  return (
    <>
      <Container>
        <BodyContainer>
          <VideoTitle>First Video</VideoTitle>
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=jNgP6d9HraI"}
            config={{
              youtube: {
                playerVars: { showinfo: 1, controls: true, },
              },
            }}
          />
        </BodyContainer>
      </Container>
    </>
  );
};

export default Tutorial;
