import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Aside />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
