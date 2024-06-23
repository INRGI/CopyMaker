import { useLocation } from "react-router-dom";
import TopFromEmail from "../../components/TopFromEmail/TopFromEmail";
import { Btn, HeaderContainer, StyledLink, TopFromContainer } from "./TopPage.styled";
import { useRef } from "react";
import { Helmet } from "react-helmet";

const TopPage = () => {
    const location = useLocation();
    const backLinkHref = useRef(location.state?.from || "/");

    return (
        <>  
            <Helmet>
                <title>Top</title>
            </Helmet>
            
            <HeaderContainer>
            <h1>Top Resources for Your Campaigns</h1>

            <StyledLink to={backLinkHref.current}>
                <Btn type="button">Back</Btn>
            </StyledLink>
            </HeaderContainer>


            <TopFromContainer>
                <TopFromEmail />
            </TopFromContainer>
            
        </>
    )
}

export default TopPage;