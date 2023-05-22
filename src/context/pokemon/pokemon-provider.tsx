import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId:4,
        isPokemonVisible: true,
        showBackImage: false,
    });
    useContextProvider(PokemonGameContext, pokemonGame);

    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        pokemons: [],
    });
    useContextProvider(PokemonListContext, pokemonList);

    useVisibleTask$(() => {
        // console.log("Primer visible tag");
        if (localStorage.getItem('pokemon-fame')) {
            const {
                isPokemonVisible = true,
                pokemonId = 10,
                showBackImage = false,
            } = JSON.parse(localStorage.getItem('pokemon-fame')!) as PokemonGameState;
            
            pokemonGame.isPokemonVisible = isPokemonVisible;
            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showBackImage = showBackImage;
        }
    });

    useVisibleTask$(({track}) => {
        // console.log("Segundo visible tag");
        track(() => [pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.showBackImage]);

        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
    });
    
    return (<Slot />)
});