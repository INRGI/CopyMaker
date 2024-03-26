import { useDispatch, useSelector } from 'react-redux';
import { Input } from './Filter.styled';
import { setDomainsFilter } from '../../redux/filtersSlice';
import { selectFilter } from '../../redux/selectors';

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter)

    const onFilterChange = e => {
        dispatch(setDomainsFilter(e.target.value))
    };

    return (
        <Input type="text" value={filter} onChange={onFilterChange} placeholder="Find domain by name"/>
    );
};


export default Filter;