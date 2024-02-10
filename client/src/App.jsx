import React from 'react';
import './styles/app.scss'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingBar from './components/Settingbar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/:id' element={
            <>
              <Toolbar />
              <SettingBar />
              <Canvas />
            </>
          } />
          <Route path='*' element={<Navigate to={`/${Date.now().toString()}`} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
