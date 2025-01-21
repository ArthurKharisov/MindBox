// eslint-disable-next-line no-undef
export default {
  "setupFilesAfterEnv": [
    "<rootDir>/.jest/setupTests.ts"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.tsx?$": ["ts-jest", {
      "tsconfig": 'tsconfig.app.json'
    }]
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "moduleNameMapper": {
    "\\.(css|less)$": "<rootDir>/.jest/styleMock.ts",
  },
};
