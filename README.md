# replace-js-pagination

**A ReactJS component to render a pagination.**

The component comes with no built-in styles. HTML layout compatible with [Bootstrap 3](https://getbootstrap.com/docs/3.4/components/#pagination) pagination stylesheets.

If you would like it to work for Bootstrap 4, you will need to define your own css styling or to add 2 additional props when using this component:
```
itemClass="page-item"
linkClass="page-link"
```
* NOTE: This component was derived from [react-js-pagination](https://github.com/wwwaiser/react-js-pagination), which apparently is no longer maintained for longer than 2 years and has a high risk 
vulnerability as reported by "npm audit" related to tar dependency.  This dependency has been removed in this "replace-js-pagination"

## Installation

Install `replace-js-pagination` with [npm](https://www.npmjs.com/):

```
$ npm install replace-js-pagination
```

## Usage

Very easy to use. Just provide props with total amount of things that you want to display on the page.

```js
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";

import { Row, Container } from "react-bootstrap";
import Pagination from "replace-js-pagination";

const App = () => {
    const [activePage, setActivePage] = useState(16);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };
    return (
        <>
            <Container>
                <Row>
                    <h1>Testing pagination: Page: {activePage} </h1>
                </Row>
                <Row>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </Row>
            </Container>
        </>
    );
};

export default App;


```

A small example is provided here: https://codesandbox.io/s/replace-js-pagination-276mpq?file=/src/App.js

![Example](https://github.com/felipecarrillo100/replace-js-pagination/raw/main/pagination.png)

## Params

Name | Type | Default | Description
--- | --- | --- | --- |
`totalItemsCount` | Number | | **Required.** Total count of items which you are going to display
`onChange` | Function | | **Required.** Page change handler. Receive pageNumber as arg
`activePage` | Number | `1` | **Required.** Active page
`itemsCountPerPage` | Number | `10` | Count of items per  page
`pageRangeDisplayed` | Number | `5` | Range of pages in paginator, exclude navigation blocks (prev, next, first, last pages)
`prevPageText` | String / ReactElement | `⟨` | Text of prev page navigation button
`firstPageText` | String / ReactElement | `«` | Text of first page navigation button
`lastPageText` | String / ReactElement | `»` | Text of last page navigation button
`nextPageText` | String / ReactElement | `⟩` | Text of next page navigation button
`getPageUrl` | Function | | Generate href attribute for page
`innerClass` | String | `pagination` | Class name of `<ul>` tag
`activeClass` | String | `active` | Class name of active `<li>` tag
`activeLinkClass` | String |  | Class name of active `<a>` tag
`itemClass` | String | | Default class of the `<li>` tag
`itemClassFirst` | String | | Class of the first `<li>` tag
`itemClassPrev` | String | | Class of the previous `<li>` tag
`itemClassNext` | String | | Class of the next `<li>` tag
`itemClassLast` | String | | Class of the last `<li>` tag
`disabledClass` | String | `disabled` | Class name of the first, previous, next and last `<li>` tags when disabled
`hideDisabled` | Boolean | `false` | Hide navigation buttons (prev, next, first, last) if they are disabled.
`hideNavigation` | Boolean | `false` | Hide navigation buttons (prev page, next page)
`hideFirstLastPages` | Boolean | `false` | Hide first/last navigation buttons
`linkClass` | String | | Default class of the `<a>` tag
`linkClassFirst` | String | | Class of the first `<a>` tag
`linkClassPrev` | String | | Class of the previous `<a>` tag
`linkClassNext` | String | | Class of the next `<a>` tag
`linkClassLast` | String | | Class of the last `<a>` tag
