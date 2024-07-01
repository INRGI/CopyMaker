import { useLocation } from "react-router-dom";
import TopFromEmail from "../../components/TopFromEmail/TopFromEmail";
import { BlockContainer, Btn, HeaderContainer, StyledLink, TopFromContainer } from "./TopPage.styled";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import TopEmojie from "../../components/TopEmojie/TopEmojie";
import TopNames from "../../components/TopNames/TopNames";

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

            <BlockContainer>
            <TopFromContainer>
                <TopFromEmail />
            </TopFromContainer>
            
            <TopEmojie />
            <TopNames />
            </BlockContainer>
        </>
    )
}

export default TopPage;