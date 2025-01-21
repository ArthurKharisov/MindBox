import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { AppContext, ITodo, TViewMode } from '../context/AppContext'
import { VIEW_MODES } from '../constants/ViewModes.ts';
import { deepClone } from '../utils';

interface IProviderProps {
  children: ReactElement;
}

/**
 * Поиск задачи по его ID.
 * @param id идентификатор задачи.
 * @param tasks список всех задач.
 */
function findTaskIndexById(id: string, tasks: ITodo[]) {
  let itemIndex: number = 0;
  for (let i = 0; i < tasks.length; i++) {
    const item = tasks[i]
    if (item.id === id) {
      itemIndex = i;
      break;
    }
  }
  return { itemIndex };
}

/**
 * Хранилище всех данных
 * @param children
 * @constructor
 */
function Provider({ children }: IProviderProps): ReactElement {

  /**
   * Хранилище задач
   */
  const [todoList, setTodoListState] = useState<ITodo[]>([]);

  /**
   * Стейт текущего вида списка All, Active, Completed
   */
  const [viewMode, setViewModeState] = useState<TViewMode>(VIEW_MODES.ALL);

  /**
   * Функция для установки списка задач в стейт и LocalStorage
   */
  const setTodoList = useCallback((newTodos: ITodo[]) => {
    try {
      localStorage.setItem('todoList', JSON.stringify(newTodos))
    } catch (e) {
      console.log('Не удалось записать список задач в LocalStorage', e);
    }
    setTodoListState(newTodos)
  }, [setTodoListState])

  /**
   * Загрузка списка задач из LocalStorage
   */
  useEffect(() => {
    const todoListFormLocalStorage = localStorage.getItem('todoList') || '';
    if (todoListFormLocalStorage) {
      try {
        const list = JSON.parse(todoListFormLocalStorage);
        setTodoList(list);
      } catch (e) {
        console.log('Не удалось получить список задач из LocalStorage', e);
      }
    }
  }, []);

  /**
   * Добавление задачи
   */
  const addTodo = useCallback((todo: ITodo) => {
    const newTodos = todoList ? [...todoList, todo] : [todo]
    try {
      localStorage.setItem('todoList', JSON.stringify(newTodos))
    } catch (e) {
      console.log('Не удалось записать список задач в LocalStorage', e);
    }
    setTodoList(newTodos)
  }, [todoList, setTodoList]);

  /**
   * Удаление задачи
   */
  const removeTodo = useCallback((id: string) => {
    const { itemIndex } = findTaskIndexById(id, todoList);
    const newArray = deepClone<ITodo>(todoList);
    if (newArray) {
      newArray.splice(itemIndex, 1);
      setTodoList(newArray);
    }
  }, [todoList, setTodoList]);

  /**
   * Функция для установки флага задачи
   */
  const setCompleted = useCallback((id: string, isCompleted: boolean) => {
    const { itemIndex } = findTaskIndexById(id, todoList);
    const newArray = deepClone<ITodo>(todoList);
    if (newArray) {
      newArray[itemIndex].isCompleted = isCompleted
      setTodoList(newArray);
    }
  }, [todoList, setTodoList])

  /**
   * Функция для очистки всех выполненных задач
   */
  const clearCompleted = useCallback(() => {
    const newArray: ITodo[] = [];
    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i]
      if (!item.isCompleted) {
        newArray.push(item);
      }
    }
    setTodoList(newArray);
  }, [todoList, setTodoList])

  /**
   * Функция для установки типа отображаемого списка
   */
  const setViewMode = useCallback((mode: TViewMode) => {
    setViewModeState(mode)
  }, []);

  return (
    <AppContext.Provider
      value={{
        todoList,
        addTodo,
        removeTodo,
        setCompleted,
        clearCompleted,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default Provider
