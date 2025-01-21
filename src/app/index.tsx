import React, { ReactElement } from 'react'
import Provider from './Provider';
import Main from '../pages/Main';
import '../styles/normalize.css';
import '../styles/common.css';

/**
 * Точка входа в приложение.
 * @constructor
 */
function App(): ReactElement {
  return (
    <Provider>
      <Main />
    </Provider>
  )
}

export default App
