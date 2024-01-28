import React from 'react';

import AppHeader from '../appHeader';
import Main from '../main';

import s from './app.module.scss';

function App() {
  return (
    <div className={s.App}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
