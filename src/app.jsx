import './assets/styles/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/global.css';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  const location = useLocation();
  useEffect(() => {
    if (!window.location.href.includes('#')) 
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      <ToastContainer autoClose={1800} theme="dark" />

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

    </div>
  );
}

export default App;
