import React from 'react';
import './styles/app.scss'
import SettingBar from './components/Settingbar';
import Toolbar from './components/Toolbar';

const App = () => {
  return (
    <div className='app'>
      <Toolbar />
      <SettingBar />
    </div>
  );
}

export default App;
