
# Virtual list with drag and drop functionality

This project was built primarily for an interview. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It makes use of additional libraries like [SASS](https://sass-lang.com/) for CSS and [React Virtual](https://github.com/tannerlinsley/react-virtual) to virtualize the list.

The code provides following functionalities:
* Ability to virtualize large lists
* Support for dynamic row height
* Scroll to bottom button which utilizes intersection observer API
* Ability to delete individual items
* Support reordering of items using drag and drop functionality
* Data persistance in local storage. 
* Support for handling multiple themes.

A form is added to test the list. You can enter any number (no validation on the form) and the list will generate random lores ipsum strings and append to the bottom of the list. A reset button is provided to reset the entire list. This will clear data from local storage as well.

There are couple of open issues in React Virtual library which causes issues with responsiveness which browser is resized or when user performs reordering of list items using drag and drop.
[PR 55](https://github.com/tannerlinsley/react-virtual/pull/55/files).

## Preview
<img src="docs/owl-list.gif?raw=true" width="300px">

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
