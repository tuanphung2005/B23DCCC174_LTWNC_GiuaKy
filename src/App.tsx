import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import BooksPage from './features/books/BooksPage';

const StatsPage = lazy(() => import('./features/stats/StatsPage'));

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Suspense fallback={<p className="state">Đang tải trang thống kê...</p>}>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
