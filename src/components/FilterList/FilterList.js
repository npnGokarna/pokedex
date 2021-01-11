import React, {useState, useEffect} from 'react';
import POKEMON_TYPES from './pokemonTypes';
import {filterPokemonList} from '../../dataLayer/actions/pokedexActions';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import './FilterList.css';

export function FilterList() {

    const fullPokemonList = useSelector(state => state.pokedexReducer.pokemonList);

    const [pokemonType, setpokemonType] = useState([...POKEMON_TYPES]);
    const [pokemonWeakness, setPokemonWeakness] = useState([...POKEMON_TYPES]);

    const dispatch = useDispatch();

    const handleTypeChange = (e) => {
        const updatedCheckedList = setCheckedState([...pokemonType], e.target.value, e.target.checked);
        setpokemonType([...updatedCheckedList]);
    };

    const handleWeaknessChange = (e) => {
        const updatedCheckedList = setCheckedState([...pokemonWeakness], e.target.value, e.target.checked);
        setPokemonWeakness([...updatedCheckedList]);
    };

    const setCheckedState = (currState, value, checked) => {
        return currState.map(item =>
            item.value === value
            ? {...item, isChecked: checked}
            : item
        );
    }

    const getSelectedItems = (arr) => {
        let result = [];
        arr.forEach(item => {
            if (item.isChecked) {
                result.push(item.value);
            }
        });
        return result;
    }

    const updateSearchResults = () => {
        const selectedTypes = getSelectedItems(pokemonType);
        const selectedWeakness = getSelectedItems(pokemonWeakness);
        dispatch(filterPokemonList(fullPokemonList, selectedTypes, selectedWeakness));
    }

    return (
        <div className="filter-list-container">
            <p>Customize filter</p>
            <div className="filter-container">
                <div className="type-container">
                    <p> Filter by Type: </p>
                    <ul>
                        {pokemonType.map(type => {
                            return <li key={type.id} >
                                <input onChange={handleTypeChange} type="checkbox" checked={type.isChecked} value={type.value}/>
                                <span className="list-label">{type.value}</span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="weakness-container">
                    <p> Filter by Weakness: </p>
                    <ul>
                        {pokemonWeakness.map(weakness => {
                            return <li key={weakness.id}>
                                <input onChange={handleWeaknessChange} type="checkbox" checked={weakness.isChecked} value={weakness.value}/>
                                <span className="list-label">{weakness.value}</span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="filter-button-container">
                <button className="filter-button" type="button" onClick={updateSearchResults}>Update Search Results</button>
            </div>
            
        </div>
    )
}

export default FilterList;