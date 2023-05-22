import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { PokemonProvider } from '~/context';
import Navbar from '~/components/shared/navbar/navbar';
import Footer from '~/components/shared/footer/footer';

export const useServerTimeLoader = routeLoader$(() => {
    return {
      date: new Date().toISOString(),
    };
  });

export default component$(() => {
  return (
        <PokemonProvider>
            <Navbar />
            <main class="flex flex-col items-center justify-center">
            <Slot />
            </main>
            <Footer />
        </PokemonProvider>
    )
});