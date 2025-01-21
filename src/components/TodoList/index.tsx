import React, { memo, ReactElement } from 'react'
import { ITodo } from '../../context/AppContext.ts';
import Todo from '../Todo';
import styles from './styles.module.css'
import classNames from 'classnames';

/**
 * Входные параметры компонента
 */
interface ITodoListProps {

  /**
   * Список задач
   */
  todoList: ITodo[];
}

/**
 * Мемоизированный список задач
 */
const MemoizedList = memo(function List({ todoList }: ITodoListProps) {
  return todoList?.map((item) => (<Todo key={item.id} {...item} />));
});

/**
 * Компонент списка задач
 * @param todoList список задач
 * @constructor
 */
function TodoList({ todoList }: ITodoListProps): ReactElement {
  return (
    <div className={classNames(styles.root)}>
      { todoList.length ? (
        <MemoizedList todoList={todoList} />
      ) : (
        <div className={styles.emptyList}>Empty</div>
      )}
    </div>
  )
}

export default TodoList
