import { component$ } from '@builder.io/qwik';
import { QwikLogo } from '../../icons/icons/qwik';
import styles from './navbar.module.css';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href='/login/'>Login</Link>
          </li>
          <li>
            <Link href='/dashboard/'>Dashboard</Link>
          </li>
          <li>
            <Link href='/counter/'>CounterHook</Link>
          </li>
          <li>
            <Link href='/pokemons/list-ssr/'>SSR-list</Link>
          </li>
          <li>
            <Link href='/pokemons/list-client/'>Client-list</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
