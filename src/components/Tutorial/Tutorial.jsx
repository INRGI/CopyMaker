import ReactPlayer from "react-player";
import { BodyContainer, Container, VideoTitle } from "./Tutorial.styled";

const Tutorial = () => {
  return (
    <>
      <Container>
        <BodyContainer>
          <VideoTitle>How to make a copie from start</VideoTitle>
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=jNgP6d9HraI"}
            config={{
              youtube: {
                playerVars: { showinfo: 1, controls: true, },
              },
            }}
          />
           <VideoTitle>Email Filter for noobies</VideoTitle>
           <ReactPlayer
            url={"https://www.youtube.com/watch?v=jNgP6d9HraI"}
            config={{
              youtube: {
                playerVars: { showinfo: 1, controls: true, },
              },
            }}
          />
          <VideoTitle>Import/Export domains</VideoTitle>
           <ReactPlayer
            url={"https://www.youtube.com/watch?v=jNgP6d9HraI"}
            config={{
              youtube: {
                playerVars: { showinfo: 1, controls: true, },
              },
            }}
          />
          <VideoTitle>Additional information(how functions works)</VideoTitle>
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
