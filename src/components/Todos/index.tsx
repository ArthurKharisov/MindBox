import React, { ReactElement, useContext, useMemo } from 'react'

import Toolbox from '../Toolbox';
import TodoList from '../TodoList';
import { AppContext } from '../../context/AppContext.ts';
import Input from '../Input';
import { VIEW_MODES } from '../../constants/ViewModes.ts';

import styles from './styles.module.css';

/**
 * Основная форма списка задач
 * @constructor
 */
function Todos(): ReactElement {
  const { todoList, viewMode } = useContext(AppContext)

  /**
   * Текущий отображаемый список задач все, активные, завершенные
   */
  const currentTodoList = useMemo(() => todoList.filter((item) => {
    let res: boolean
    switch (viewMode) {
      case VIEW_MODES.PLANNED:
        res = !item.isCompleted;
        break;
      case VIEW_MODES.FINISHED:
        res = item.isCompleted;
        break;
      default:
        res = true
    }
    return res
  }), [viewMode, todoList])

  return (
    <div className={styles.root}>
      <Input />
      <TodoList todoList={currentTodoList} />
      <Toolbox />
    </div>
  )
}

export default Todos
