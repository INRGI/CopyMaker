import { useState } from "react";
import { Container, SupportText, Text } from "./UploadInfo.styled";
import { BiDonateHeart } from "react-icons/bi";
import { CgMonday } from "react-icons/cg";
import DonateModal from "../DonateModal/DonateModal";

const UploadInfo = () => {
    const [isDonateOpen, setDonateOpen] = useState(false);
    return (
        <>
        <Container>
            <Text>Last <CgMonday /> Update: 04.11(10:20)</Text>
            <SupportText onClick={()=> setDonateOpen(true)}><BiDonateHeart /> Support Us Here</SupportText>
        </Container>
        <DonateModal
            isOpen={isDonateOpen}
            onClose={() => setDonateOpen(false)}
        />
        </>
    )
}

export default UploadInfo;