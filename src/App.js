import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './layout/Header';
import GorevEkle from './packages/GorevEkle';
import GorevListesi from './packages/GorevListesi';
import GorevKartlari from './packages/GorevKartlari';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Header></Header>}>
                <Route path='/gorevEkle' element={<GorevEkle></GorevEkle>}></Route>
                <Route path='/gorevListesi' element={<GorevListesi></GorevListesi>}></Route>
                <Route path='/gorevKartlari' element={<GorevKartlari></GorevKartlari>}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
