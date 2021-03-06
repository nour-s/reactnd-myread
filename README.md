# MyReads Project

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## Components map

![Alt text](./components_map.svg)

## Additional feature

In addition to all the specified project specifications, I implemented an additional one with is the ability to browse to a specified search results using URL query string.
For instance: http://localhost:3000/search?query=Android

## TL;DR
IMPORTANT: I used yarn instead of NPM.

To get started developing right away:

-   install all project dependencies with `yarn install`
-   start the development server with `yarn start`

## What You're Getting

```bash
|-- .eslintrc.json # eslint configuration file.
|-- .gitignore # Git ignore files list
|-- components_map.svg # an illustration of the components
|-- package.json  # npm package manager file. It's unlikely that you'll need to modify this.
|-- README.md - This file.
|-- SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
|-- yarn.lock # yarn package manager file. It's unlikely that you'll need to modify this.
|-- .vscode
|   |-- launch.json # VS Code launch scripts
|   |-- settings.json # VS Code settings
|-- coverage
|   └── lcov-report # the unit test coverage report
|-- public
├── favicon.ico # React Icon, You may change if you wish.
├── index.html # DO NOT MODIFY
└── src
    |-- App.css
    |-- App.js
    |-- Book.js
    |-- BookCase.js
    |-- BooksAPI.js
    |-- directoryList.md
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
    |-- SearchBooks.js
    |-- setupTests.js
    |-- Shelf.js
    |-- Util.js
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    └── __tests__
        |-- App.test.js # App component unit test file
        |-- Book.test.js # Book component unit test file
        |-- BookCase.test.js # BookCase component unit test file
        |-- SearchBooks.test.js # SearchBooks component unit test file
        |-- Shelf.test.js # Shelf component unit test file
        └── __snapshots__
            |-- App.test.js.snap  # App component unit test snapshot file (for Jest)
            |-- Book.test.js.snap  # Book component unit test snapshot file (for Jest)
            |-- BookCase.test.js.snap  # BookCase component unit test snapshot file (for Jest)
            |-- SearchBooks.test.js.snap  # SearchBooks component unit test snapshot file (for Jest)
            └── Shelf.test.js.snap  # Shelf component unit test snapshot file (for Jest)

```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

-   [`getAll`](#getall)
-   [`update`](#update)
-   [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

-   Returns a Promise which resolves to a JSON object containing a collection of book objects.
-   This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

-   book: `<Object>` containing at minimum an `id` attribute
-   shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
-   Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults);
```

-   query: `<String>`
-   maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
-   Returns a Promise which resolves to a JSON object containing a collection of book objects.
-   These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
