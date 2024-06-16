import { useSelector } from "react-redux";
import { selectVisibleDomains } from "../../redux/selectors";

import { useLocation } from "react-router-dom";
import { Container, Domain, DomainDetail } from "./FastRedirect.styled";

const FastRedirect = () => {
  const visibleDomains = useSelector(selectVisibleDomains);
  const location = useLocation();

  return (
    <Container>
      {visibleDomains.map((domain) => (
        <Domain key={domain.id}>
          <DomainDetail
            key={domain.id}
            to={`/${domain.id}`}
            state={{ from: location }}
          >
            {domain.name}
          </DomainDetail>
        </Domain>
      ))}
    </Container>
  );
};

export default FastRedirect;
