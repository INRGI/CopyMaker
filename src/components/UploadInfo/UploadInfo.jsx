import { Container, Text } from "./UploadInfo.styled";
import { CgMonday } from "react-icons/cg";

const UploadInfo = () => {
    return (
        <Container>
            <Text>Last <CgMonday /> Update: 22.07(09:05)</Text>
        </Container>
    )
}

export default UploadInfo;