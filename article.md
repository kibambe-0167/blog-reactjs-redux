

### create a reactjs app using yarn. go to your terminal, and type the following code to create a reactjs web-app.

- yarn create react-app web-app

### go into the root of your web-app folder.
- cd web-app

### make sure all packages are install ( at this stage, it optional). type below command in your terminal and press enter.s
- yarn

### start the app with
- yarn start

I usually delete the entire codes in file of src/App.js

### (optional) mostly use tailwind for css. more aboue it here. https://tailwindcss.com/docs/guides/create-react-app
- yarn add tailwindcss
- npx tailwindcss init
- 


# there is redux and reactjs
### add react-redux and @reduxjs/toolkit to our app.
- yarn add react-redux
- yarn add @reduxjs/toolkit
- make sure to wrap the entire code in a provider at the root of you code, in index.js file
- create a store using, createConfigure from react-redux, in a file src/redux_/store.js


### create the redux store.
- see codes in src/redux_/store.js app.
- import configureStore api from @reduxjs/toolkit
- create a redux store and export it, see file src/redux_/store.js


### provide the redux store to react-redux
- call the redux store we created in src/redux_/store.js in our index.js where we put the <Provider>
- pass it as a props.
- 


### let create a slice.
- you might get errors about the redux created in src/redux_/store.js not having valid reducers, ignore that for now, because in our next step we're going to fix that.
- now to create a slice, which will provider reducers to our react redux store. we need to make a file, you might prefer to put all you slices in one file, i just prefer to put mine in different files.
- i will create a file named, counter in src/redux_/slices/counter.js