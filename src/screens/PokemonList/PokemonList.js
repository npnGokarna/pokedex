import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {getPokemonList} from '../../dataLayer/actions/pokedexActions';
import './PokemonList.css';

export class PokemonList extends Component {
    

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getPokemonList());
    }

    render() {
        const { pokemonList } = this.props;
        console.log(pokemonList);
        return (
            <Fragment>
                Welcome to Pokedex
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return ({
        ...state,
        pokemonList: state.pokedexReducer.pokemonList
    })
}


export default connect(mapStateToProps)(PokemonList);