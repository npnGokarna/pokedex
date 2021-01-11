import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import './PokemonTable.css';

export function PokemonTable() {
    const pokedexList = useSelector(state => state.pokedexReducer.filteredPokemonList);
    const history = useHistory();

    const [searchFieldText, setSearchText] = useState('');
    const [searchKey] = useDebounce(searchFieldText, 500);
    const [filteredList, filterList] = useState([]);

    useEffect(() => {
        const newList = pokedexList.filter(pokemon => (pokemon.name || '').toLowerCase().includes(searchKey.toLowerCase()))
        filterList(newList);
    }, [pokedexList, searchKey]);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    const navigateToDetails = (e) => {
        const uri = e.target.textContent.toLowerCase();
        history.push(`/${uri}`);
    }

    return (
        <div className="pokemon-table-container">
            <div className="search-field-container">
                <input className="search-field" type="text" value={searchFieldText} placeholder="Search pokemon by name" onChange={handleChange} />
            </div>
            {filteredList.length ? 
                <table className="pokemon-table">
                    <thead>
                        <tr className="pokemon-table-row table-header">
                            <th>Name</th>
                            <th>Number</th>
                            <th>Type</th>
                            <th>Weakness</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((item, index) => {
                            return (
                                <tr className="pokemon-table-row" key={index}>
                                    <td className="pokemon-name" onClick={navigateToDetails}>{item.name}</td>
                                    <td>{item.num}</td>
                                    <td>{item.type.join(', ')}</td>
                                    <td>{item.weaknesses.join(', ')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            : <div className="empty-page"> No results found! Please try again</div>}
        </div>
    )
}

export default PokemonTable;