import { useState } from "react";
import { Container, StyledLink, Text } from "./UploadInfo.styled";

const UploadInfo = () => {
    const [isDonateOpen, setDonateOpen] = useState(false);
    return (
        <>
        <Container>
            <Text>It's no longer will be supported! Please move to <StyledLink href="https://copymaker.vercel.app/">new version</StyledLink></Text>
        </Container>
        </>
    )
}

export default UploadInfo;