import React, {
  FormEvent,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useContext,
  useRef
} from 'react'
import { AppContext } from '../../context/AppContext.ts';
import styles from './styles.module.css'

/**
 * Компонент добавления новых задач
 * @constructor
 */
function Input(): ReactElement {
  const { addTodo } = useContext(AppContext);

  /**
   * ref инпута для изменения классов DOM элемента
   */
  const inputRef = useRef<HTMLInputElement| null>(null)

  /**
   * Функция сброса инпута
   */
  const resetInput = useCallback(() => {
    if (inputRef.current && 'value' in inputRef.current) {
      inputRef.current.value = ''
      inputRef.current?.classList.remove(styles.inputTouched)
    }
  }, []);

  /**
   * Обработчик ввода на инпуте, по клику на Enter добавляет задачу
   */
  const onKeyDown = useCallback((event: SyntheticEvent<HTMLInputElement, KeyboardEvent>) => {
    if ((event as unknown as KeyboardEvent).key === 'Enter' && event?.currentTarget?.value) {
      addTodo({
        isCompleted: false,
        caption: event.currentTarget.value.toString(),
        id: String((new Date().getTime() % 100) + Math.random()),
      })
      resetInput();
    }
  }, [addTodo])

  /**
   * Еще один обработчик ввода на инпуте для показа кнопки сброса
   */
  const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value && !inputRef.current?.classList.contains(styles.inputTouched)) {
      inputRef.current?.classList.add(styles.inputTouched)
    } else if (!(event.target as HTMLInputElement).value && inputRef.current?.classList.contains(styles.inputTouched)) {
      inputRef.current?.classList.remove(styles.inputTouched)
    }
  }, [])

  return (
    <div className={styles.inputContainer}>
      <div className={styles.iconContainer}>
        <img
          className={styles.icon}
          src='src/assets/down-icon.png'
        />
      </div>
      <input
        className={styles.input}
        ref={inputRef}
        type='text'
        onKeyDown={onKeyDown}
        onInput={onInput}
        placeholder='What needs to be done?'
      />
      <button
        className={styles.clearButton}
        onClick={resetInput}
        aria-label='Clear input'
        title='Clear input'
      >
        ×
      </button>
    </div>
  )
}

export default Input
