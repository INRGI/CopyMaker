import { BtnBack, Container, StyledLink, Title } from "./NotFound.styled";

const NotFound = () => {
    return (
        <Container>
            <StyledLink to='/'>
                <BtnBack type="button">Back</BtnBack>
            </StyledLink>
            <Title>Not Found</Title>
        </Container>
    )
}
export default NotFound;