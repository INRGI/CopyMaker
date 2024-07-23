import { useSelector } from "react-redux";
import { selectVisibleDomains } from "../../redux/selectors";

import { useLocation } from "react-router-dom";
import { Container, Domain, DomainDetail, List, Title } from "./FastRedirect.styled";

const FastRedirect = () => {
  const visibleDomains = useSelector(selectVisibleDomains);
  const location = useLocation();

  return (
    <Container>
      <Title>Domains</Title>
      <List>
      {visibleDomains.map((domain) => (
        <Domain key={domain.id}>
          <DomainDetail
            key={domain.id}
            to={`/auto/${domain.id}`}
            state={{ from: location }}
          >
            {domain.name}
          </DomainDetail>
        </Domain>
      ))}
      </List>
    </Container>
    
  );
};

export default FastRedirect;
