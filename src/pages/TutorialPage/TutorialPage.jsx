import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Btn, StyledLink } from "../TutorialPage/TutorialPage.styled";
import { Helmet } from "react-helmet";
import Tutorial from "../../components/Tutorial/Tutorial";

const TutorialPage = () => {
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from || "/");

  return (
    <>
      <Helmet>
        <title>Tutorials</title>
      </Helmet>
      <StyledLink to={backLinkHref.current}>
        <Btn type="button">Back</Btn>
      </StyledLink>
      <Tutorial />
    </>
  );
};

export default TutorialPage;
