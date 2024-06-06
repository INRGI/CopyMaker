import { Helmet } from "react-helmet"
import EmailFilter from "../../components/EmailFilter/EmailFilter"
import { Btn, StyledLink } from "../DomainPage/DomainPage.styled"
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const CsvPage = () => {
    const location = useLocation();
    const backLinkHref = useRef(location.state?.from || "/");

    return (
        <>
            <Helmet>
                <title>Email Filter</title>
            </Helmet>

            <StyledLink to={backLinkHref.current}>
                <Btn type="button">Back</Btn>
            </StyledLink>
            <center><h1>Email Filter (NOT READY, BUT YOU CAN TRY)</h1></center>
            <EmailFilter />
        </>
    )
}

export default CsvPage;