import { SocialIcon } from "react-social-icons";
import { Container, Text } from "./AboutAuthor.styled";

const AboutAuthor = () => {
    return (
        <Container>
            <Text>Author</Text>
            <SocialIcon target="_blank" network="github" url="https://github.com/INRGI" style={{ height: 35, width: 35 }}/>
            <SocialIcon target="_blank" network="telegram" url="https://t.me/INickJackI" style={{ height: 35, width: 35 }}/>
        </Container>
    )
}

export default AboutAuthor;