import React, { ChangeEvent, ReactElement, useCallback, useContext } from 'react'
import { AppContext, ITodo } from '../../context/AppContext';
import styles from './styles.module.css'
import classNames from 'classnames';

/**
 * Компонент задачи в списке
 * @param id идентификатор задачи
 * @param isCompleted флаг выполнена ли задача
 * @param caption текст задачи
 * @constructor
 */
function Todo({ id, isCompleted, caption }: ITodo): ReactElement {
  const { setCompleted, removeTodo } = useContext(AppContext);

  /**
   * Обработчик изменения флага задачи
   */
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(id, Boolean(event.currentTarget.checked));
  }, [id, setCompleted]);

  /**
   * Обработчик удаления задачи
   */
  const onClickRemove = useCallback(() => {
    removeTodo(id);
  }, [id, removeTodo]);

  return (
    <div className={styles.root}>
      <div className={styles.line}>
        <label className={classNames(styles.control, styles.controlCheckbox)}>
          <div className={classNames(styles.lineText, isCompleted ? styles.lineTextFinished : undefined)}>
            {caption}
          </div>
          <input type="checkbox" defaultValue={isCompleted ? 'checked' : ''} checked={isCompleted} onChange={onChange}/>
          <div className={styles.controlIndicator}></div>
        </label>
        <div className={styles.lineDelete} onClick={onClickRemove}>×</div>
      </div>
    </div>
  )
}

export default Todo
