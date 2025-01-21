import React, { ReactElement, useCallback, useContext, useMemo } from 'react'
import styles from './styles.module.css'
import { AppContext, TViewMode } from '../../context/AppContext.ts';
import { VIEW_MODES } from '../../constants/ViewModes.ts';

/**
 * Панель управления списком
 * @constructor
 */
function Toolbox(): ReactElement {
  const { setViewMode, viewMode, todoList, clearCompleted } = useContext(AppContext);

  /**
   * Обработчик изменения типа списка
   */
  const onClick = useCallback((viewMode: TViewMode) => () => {
    setViewMode(viewMode);
  }, []);

  /**
   * Счетчик оставшихся активных задач
   */
  const itemsLeft = useMemo(() => {
    let count = 0;
    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i]
      if (!item.isCompleted) {
        count++;
      }
    }
    return count
  }, [todoList]);

  /**
   * Обработчик удаления всех завершенных задач
   */
  const clearAllCompleted = useCallback(() => clearCompleted(), [clearCompleted]);

  return (
    <div className={styles.root}>
      <div className={styles.leftBox}>
        {viewMode !== VIEW_MODES.FINISHED && `${itemsLeft} items left`}
      </div>
      <div className={styles.switchToggle}>
        <input id="all" name="state" type="radio" checked={viewMode === VIEW_MODES.ALL} onChange={onClick(VIEW_MODES.ALL)}/>
        <label htmlFor="all">All</label>
        <input id="planned" name="state" type="radio" onChange={onClick(VIEW_MODES.PLANNED)}/>
        <label htmlFor="planned">Active</label>
        <input id="finished" name="state" type="radio" onChange={onClick(VIEW_MODES.FINISHED)}/>
        <label htmlFor="finished">Completed</label>
      </div>
      <div className={styles.clearCompletedButton} onClick={clearAllCompleted}>
        Clear completed
      </div>
    </div>
  )
}

export default Toolbox
