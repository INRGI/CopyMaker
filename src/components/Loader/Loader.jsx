import { MagnifyingGlass } from "react-loader-spinner";
import { Container } from "./Loader.styled";

const Loader = () => {
    return (
        <Container>
            <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#1d1c1c"
            />
        </Container>
    )
};

export default Loader;