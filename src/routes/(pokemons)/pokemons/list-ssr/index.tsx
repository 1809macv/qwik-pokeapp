import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getFunFactAboutPokemon } from '~/helpers/get-chat-gpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>( async( {query, redirect, pathname}) => {

  const offset = Number( query.get('offset') || 0);
  if (offset < 0 ) redirect(301, pathname);
  if (isNaN(offset)) redirect(301, pathname);

  return await getSmallPokemons(offset);
})

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: '',
  });

  const chatGptPokemonFact = useSignal('');
  

  const showModal = $(( id: string, name:string ) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    
    modalVisible.value = true;
  })

  
  const closeModal = $(() => {
    modalVisible.value = false;
  })

  useVisibleTask$(({track}) => {
    track(() => modalPokemon.name);

    chatGptPokemonFact.value = '';

    if (modalPokemon.name.length > 0) {
      getFunFactAboutPokemon(modalPokemon.name)
        .then( resp => chatGptPokemonFact.value = resp);
    }
  })

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset');
    const offsetString = new URLSearchParams(location.url.searchParams);
    return Number(offsetString.get('offset') || 0);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: { currentOffset }</span>
        <span>Esta cargando pagina: { location.isNavigating ? 'Si': 'No'}</span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
            class="btn btn-primary mr-2">Anteriores</Link>
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
            class="btn btn-primary mr-2">Siguientes</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map( ({name, id}) => (
            <div key={name}
                onClick$={() => showModal(id, name)}
                class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id}/>
              <span class="capitalize">{name}</span></div>
          ))
        }
        
      </div>

      <Modal
            persistent
            size='lg'
            showModal={modalVisible.value} closeFn={closeModal}>
        <div q:slot='title'>{ modalPokemon.name }</div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage id={ modalPokemon.id } />
          <span>
            { chatGptPokemonFact.value === ''
              ? 'Preguntando a ChatGPT'
              : chatGptPokemonFact.value}
          </span>
        </div>
        <span>Hola Mundo</span>
      </Modal>
    </>
  )
});

export const head: DocumentHead = {
  title: 'SSR - List',
};
