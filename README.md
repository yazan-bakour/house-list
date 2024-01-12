# Customers establishment

This is a House listing application setup for a real estate client. (Vue 3, Script setup, Vuex).

User are able to search, sort, create/edit house listing and navigate to the house lisitng details with ability to delete.

API calls for Houses are ( Create, Get, Get by Id, Upload image, Delete and Edit) with response and error handle. 

There are extra requirements has been implemented such as (Sorting by price or size, Pagination, Skelaton and Toast component).

Folder Structure Conventions
============================

> Folder structure options and naming conventions for software projects

### Directory layout

    .
    ├── ...
    ├── src                     # The main source directory.
    │   ├── common              # It includes components and layouts for different views based on the design to reuse code and better structure for mobile, tablet and desktop.
    │   ├── router              # Routes of pages that been called in each tab of the header and also navigating between Edit/Create new lisitng, Listing detail, and the main overview page.
    │   ├── store               # This is the global state storage. Mainly handle the API calles and store the response with state to be dispatched anywhere in the application.
    │   └── views               # Main house listing page, About, Form to create or edit listing, and also the house listing details page. All views are been controlled in the router index file.
    └── helper                  # File created to have reuseable function to be imported into any logic.

### Scripts

- yarn install
- yarn serve
- yarn run build

### 3rd party libraries

No 3rd party library. There is a base.css file that contains all the colors palletes variables and global css for typography, inputs and buttons.  