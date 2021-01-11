import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import './PokemonDetails.css';

export class PokemonDetails extends Component {
    
    state = {
        currentPokemon: {}
    }

    componentDidMount() {
        this.setCurrentPokemon();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            this.setCurrentPokemon();
        }
    }

    setCurrentPokemon = () => {
        const { location } = this.props;
        const name = location.pathname.split('/')[1].trim();
        this.setState({
            ...this.state,
            currentPokemon: {...this.getCurrentPokemon(name)}
        });
    }

    getCurrentPokemon = (name) => {
        const { pokemonList } = this.props;
        return pokemonList.find(item => item.name.toLowerCase() === name);
    }

    navigateToList = () => {
        const {history} = this.props;
        history.push('/');
    }

    navigateToDetailPage = (e) => {
        const {history} = this.props;
        const name = e.target.textContent.toLowerCase().trim();
        console.log(name);
        history.push(`/${name}`);

    }

    render() {
        const { currentPokemon } = this.state;
        return (
            <Fragment>
                <div className="details-container">
                    <div className="back-button-container">
                    <button className="back-button" type="button" onClick={this.navigateToList}>Go back to results</button>
                    </div>
                    {
                        Object.keys(currentPokemon).length ? 
                        <div className="available-details">
                            <div className="pokemon-name">{currentPokemon.name}</div>
                            <div className="pokemon-num">{currentPokemon.num}</div>
                            <div className="pokemon-image-container">
                                <img className="pokemon-image" src={currentPokemon.img} alt="pokemon-img"></img>
                            </div>
                            <div className="pokemon-type">
                                Type: {(currentPokemon.type || []).join(', ')}
                            </div>
                            <div className="pokemon-weakness">
                                Weaknesses: {(currentPokemon.weaknesses || []).join(', ')}
                            </div>
                            <div className="pokemon-height">
                                Height: {currentPokemon.height}
                            </div>
                            <div className="pokemon-weight">
                                Weight: {currentPokemon.weight}
                            </div>
                            <div className="evolution-container">
                                <div className="prev-evolution">
                                    Previous Evolution: {
                                        currentPokemon.prev_evolution ? 
                                        <div className="evolution-list">
                                            {currentPokemon.prev_evolution.map((item, index) => {
                                                return <p key={index} onClick={this.navigateToDetailPage}>{item.name}</p>
                                            })}
                                        </div>
                                        : <div>N/A</div>
                                    }
                                </div>
                                <div className="next-evolution">
                                    Next Evolution: {
                                        currentPokemon.next_evolution ? 
                                        <div className="evolution-list">
                                            {currentPokemon.next_evolution.map((item, index) => {
                                                return <p key={index} onClick={this.navigateToDetailPage}>{item.name}</p>
                                            })}
                                        </div>
                                        : <div>N/A</div>
                                    }
                                </div>
                            </div>
                            
                        </div>
                        : <div className="no-details"> Since persistence is not implemented, data does not persist on reload. Please return back to the list!</div>
                    }
                    
                </div>
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


export default connect(mapStateToProps)(PokemonDetails);