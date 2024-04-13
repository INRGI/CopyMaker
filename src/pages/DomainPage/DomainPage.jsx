import { useLocation, useParams } from "react-router-dom";
import FormPromo from "../../components/FormPromo";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Btn, StyledLink } from "./DomainPage.styled";

const DomainPage = () => {
    const { domainId } = useParams();
    const domains = useSelector(state => state.domains);
    const domain = domains.find(domain => domain.id === domainId);
    const domainName = domain ? domain.name : "Loading...";
    const location = useLocation();
    const backLinkHref = useRef(location.state?.from || "/");

    return (
        <>
            <Helmet>
                <title>{domainName}</title>
            </Helmet>

            <StyledLink to={backLinkHref.current}>
                <Btn type="button">Back</Btn>
            </StyledLink>

            <FormPromo />
        </>
    )
}

export default DomainPage;
