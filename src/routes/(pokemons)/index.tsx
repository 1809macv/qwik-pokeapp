import { $, component$, useContext } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {

  const poke = useNavigate();
  const {
      isPokemonVisible,
      nextPokemon,
      pokemonId,
      prevPokemon,
      showBackImage,
      toggleVisible,
      toggleFromBack,
  } = usePokemonGame();

  // const pokemonGame =  useContext((PokemonGameContext));

  // const changePokemonId = $(( value: number ) => {
  //   if (pokemonGame.pokemonId + value <= 0) return;
  //   pokemonGame.pokemonId += value
  // })

  const goToPokemon = $(() => {
    poke(`/pokemon/${pokemonId.value}/`);
  })

  return (
    <>
      <span>Buscador Simple</span>
      <span class="text-9xl">{ pokemonId.value }</span>

      <div onClick$={ () => goToPokemon() }>
        <PokemonImage id={ pokemonId.value} backImage={showBackImage.value}
                isVisible={isPokemonVisible.value} />
      </div>

      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2"> Anterior </button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2"> Siguiente </button>

        <button onClick$={ toggleFromBack } 
                class="btn btn-primary mr-2"> Voltear </button>
        <button onClick$={ toggleVisible }
                class="btn btn-primary"> Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Poke-Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
