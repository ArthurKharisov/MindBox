import '@testing-library/jest-dom';

interface IStore {
  [key: string]: unknown
}

const localStorageMock = (function() {
  let store: IStore = {}

  return {
    getItem: function(key: string) {
      return store[key] || null
    },
    setItem: function(key: string, value: object) {
      store[key] = value.toString()
    },
    removeItem: function(key: string) {
      delete store[key]
    },
    clear: function() {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

