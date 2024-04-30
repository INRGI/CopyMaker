import { BtnBack, Container, PageContainer, StyledLink, Title } from "./NotFound.styled";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
    return (
        <Container>
            <PageContainer>
                <TbError404 size={100}/>
                <Title>Something went wrong😥<br></br>Please return to Home page</Title>
                <StyledLink to='/'>
                    <BtnBack type="button">Return to Home</BtnBack>
                </StyledLink>
            </PageContainer>
        </Container>
    )
}
export default NotFound;