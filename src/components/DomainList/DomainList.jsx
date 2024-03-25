import { useSelector } from "react-redux";
import { selectVisibleDomains } from "../../redux/selectors";

const DomainList = () => {
    
    const visibleDomains = useSelector(selectVisibleDomains);
    
        return visibleDomains.map(domain => (
            <h3 key={domain.id}>{domain.name}</h3>
        ))
}

export default DomainList;