import { setupComponent } from './setup.tsx';
import { fireEvent, screen } from '@testing-library/react';

function addNewTask(task: string) {
  const input = screen.getByPlaceholderText('What needs to be done?')
  fireEvent.change(input, { target: { value: task } })
  fireEvent.keyDown(input, {
    key: "Enter",
    code: "Enter",
    keyCode: 32,
    charCode: 32
  })
  const taskElement = screen.getByText(task)
  expect(taskElement).toBeInTheDocument()
  expect(input).toBeEmptyDOMElement()
  return taskElement
}

describe('App', () => {
  it('Should visible form on load', () => {
    setupComponent()
    expect(screen.getByText('todos')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
  })

  it('Should add new task', () => {
    setupComponent()
    addNewTask('My mega task')
  })

  it('Should load task from localStorage', () => {
    localStorage.setItem('todoList', JSON.stringify([
      {
        id: '123',
        isCompleted: false,
        caption: 'Mega task',
      }
    ]))
    setupComponent()
    expect(screen.getByText('Mega task')).toBeInTheDocument()
    expect(screen.getByText('1 items left')).toBeInTheDocument()
  })

  it('Should visible task by view mode', () => {
    setupComponent()
    const myMegaTask = addNewTask('My mega task')
    const myMLPTask = addNewTask('My little pony')
    const myFinishedElement = addNewTask('My finished task')
    expect(screen.getByText('3 items left')).toBeInTheDocument()

    fireEvent.click(myFinishedElement, {
      target: {checked: true}
    })
    expect((myFinishedElement as HTMLInputElement).checked).toEqual(true)
    expect(screen.getByText('2 items left')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Active'))
    expect(myMegaTask).toBeInTheDocument()
    expect(myMLPTask).toBeInTheDocument()
    expect(myFinishedElement).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Completed'))
    expect(myMegaTask).not.toBeInTheDocument()
    expect(myMLPTask).not.toBeInTheDocument()
    expect(screen.getByText('My finished task')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Clear completed'))
    expect(screen.getByText('Empty')).toBeInTheDocument()
  })
})
