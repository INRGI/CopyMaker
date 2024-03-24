const DomainList = ({domains}) => {
        return domains.map(domain => (
            <h3 key={domain.id}>{domain.name}</h3>
        ))
}

export default DomainList;