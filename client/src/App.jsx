import React from 'react';
import './styles/app.scss'
import SettingBar from './components/Settingbar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';

const App = () => {
  return (
    <div className='app'>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
