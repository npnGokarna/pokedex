import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {getPokemonList} from '../../dataLayer/actions/pokedexActions';
import PokemonTable from '../../components/PokemonTable';
import FilterList from '../../components/FilterList';
import './PokemonList.css';

export class PokemonList extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getPokemonList());
    }

    render() {
        return (
            <Fragment>
                <div className="pokedex-container">
                    <div className="pokemon-search-filter-container">
                        <FilterList />
                    </div>
                    <div className="pokemon-list-container">
                        <PokemonTable />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return ({
        ...state
    })
}


export default connect(mapStateToProps)(PokemonList);