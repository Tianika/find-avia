import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AviaInfoPage from '../pages/aviaInfoPage/AviaInfoPage';
import AviaPage from '../pages/aviaPage/AviaPage';
import IndexPage from '../pages/indexPage/IndexPage';
import { ROUTER_MAP } from '../utils/constants';
import styles from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <main className={styles.app}>
        <div className="wrapper">
          <Routes>
            <Route path={ROUTER_MAP.index} element={<IndexPage />} />
            <Route path={ROUTER_MAP.avia} element={<AviaPage />} />
            <Route path={`${ROUTER_MAP.avia}${ROUTER_MAP.info}`} element={<AviaInfoPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
