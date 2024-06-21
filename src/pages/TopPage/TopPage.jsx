import TopFromEmail from "../../components/TopFromEmail/TopFromEmail";
import { TopFromContainer } from "./TopPage.styled";

const TopPage = () => {
    return (
        <>
            <h1>TopPage</h1>
            <TopFromContainer>
                <TopFromEmail />
            </TopFromContainer>
            
        </>
    )
}

export default TopPage;