import { useDispatch, useSelector } from 'react-redux';
import { Container, Input, Label } from './Filter.styled';
import { setDomainsFilter } from '../../redux/filtersSlice';
import { selectFilter } from '../../redux/selectors';

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter)

    const onFilterChange = e => {
        dispatch(setDomainsFilter(e.target.value))
    };

    return (
        <Container>
            <Label>
                Find domain by name
                <Input type="text" value={filter} onChange={onFilterChange}/>
            </Label>
        </Container>
    );
};


export default Filter;