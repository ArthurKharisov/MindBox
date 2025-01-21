import React, { ReactElement } from 'react'
import Todos from '../../components/Todos';
import styles from './styles.module.css'

/**
 * Главная страница
 * @constructor
 */
function Main(): ReactElement {
  return (
    <div className={styles.root}>
      <div className={styles.block}>
        <div className={styles.logo}>todos</div>
        <Todos />
      </div>
    </div>
  )
}

export default Main
