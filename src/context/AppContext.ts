import { createContext } from 'react';
import { VIEW_MODES } from '../constants/ViewModes.ts';

/**
 * Тип отображаемого списка
 */
export type TViewMode = 'all' | 'finished' | 'planned';

/**
 * Конфигурация задачи
 */
export interface ITodo {
  id: string;
  isCompleted: boolean;
  caption: string;
}

/**
 * Описание контекста приложения
 */
export interface IAppContext {

  /**
   * Список всех задач
   */
  todoList: ITodo[];

  /**
   * Добавить задачу
   * @param todo конфигурация задачи
   */
  addTodo(todo: ITodo): void;

  /**
   * Удаление задачи
   * @param id идентификатор задачи
   */
  removeTodo(id: string): void;

  /**
   * Изменить статус задачи
   * @param id идентификатор задачи
   * @param isCompleted новый статус задачи
   */
  setCompleted(id: string, isCompleted: boolean): void;

  /**
   * Удаление всех выполненных задач
   */
  clearCompleted(): void;

  /**
   * Текущий тип отображения списка задач
   */
  viewMode: TViewMode

  /**
   * Установить тип отображения задач
   * @param mode
   */
  setViewMode(mode: TViewMode): void;
}

/**
 * Контекст приложения
 */
export const AppContext = createContext<IAppContext>({
  todoList: [],
  addTodo: () => {},
  removeTodo: () => {},
  setCompleted: () => {},
  clearCompleted: () => {},
  viewMode: VIEW_MODES.ALL,
  setViewMode: () => {},
})
