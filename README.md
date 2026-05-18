# replace-js-pagination

**A highly optimized, zero-dependency, and modern React pagination component.**

Designed as a bit-for-bit, 100% backward-compatible, plug-and-play drop-in replacement for the unmaintained [react-js-pagination](https://github.com/wwwaiser/react-js-pagination) library. Rebuilt from the ground up to support modern React and modern tooling.

👉 **[View the Live Demo & Theme Explorer](https://felipecarrillo100.github.io/replace-js-pagination/)**

---

## ⚡ What's New in v2.0.0

* **React 18 & 19 Native**: Fully rewritten as hooks-based functional components compatible with **React Strict Mode** and prepared for the **React Compiler** and **React Server Components (RSC)**.
* **TypeScript Native**: Built entirely in TypeScript. Delivers high-fidelity typings and inline autocompletion popups for your IDE out-of-the-box.
* **Zero Legacy Bloat**: Completely removed the outdated and unmaintained third-party `"paginator"` mathematical package. Paging computations are now performed by an internal, zero-dependency calculator module, making the bundle tiny (**5.6 kB** packed).
* **Modern Tooling**: Compiled using **tsup** and powered by **Vite 8** and **Vitest** for robust and instant unit testing.
* **Dual ESM/CJS Distribution**: Packages standard ES Modules (`dist/index.mjs`) and CommonJS (`dist/index.js`) simultaneously for seamless integration into Vite, Webpack, Next.js, Rollup, or Node runtimes.
* **Isolated Playground Sandbox**: The interactive preview application has been moved to its own standalone directory (`/demo`) with its own self-contained dependency block, keeping the production source tree perfectly clean.

---

## Installation

Install `replace-js-pagination` with your preferred package manager:

```bash
# npm
npm install replace-js-pagination

# yarn
yarn add replace-js-pagination

# pnpm
pnpm add replace-js-pagination
```

---

## Usage

Using `replace-js-pagination` is simple and direct. Just pass the total count of items and your change-event callback. 

### Modern TypeScript Example

```tsx
import React, { useState } from "react";
import Pagination from "replace-js-pagination";

// Optional: Import Bootstrap stylesheet if using standard Bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCatalog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalItems = 450;

  const handlePageChange = (pageNumber: number) => {
    console.log(`Transitioned to page: ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container py-4">
      <h2>Catalog Page: {currentPage}</h2>
      
      {/* Renders standard Bootstrap pagination list elements */}
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItems}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default ProductCatalog;
```

---

## Styling and Themes

By default, the component is class-agnostic and yields a clean semantic `ul > li > a` hierarchy.

* **Bootstrap 3/4/5 Compatibility**: If your app uses Bootstrap, pass `itemClass="page-item"` and `linkClass="page-link"` (as shown above) to align perfectly.
* **Tailwind CSS & Custom Styling**: If you use Tailwind, pass your custom classes directly into `innerClass`, `itemClass`, and `activeClass` for instant customization:
  ```tsx
  <Pagination
    activePage={currentPage}
    totalItemsCount={200}
    onChange={handlePageChange}
    innerClass="flex gap-1 justify-center list-none"
    itemClass="px-3 py-1.5 border border-slate-700 rounded bg-slate-900 text-slate-300 hover:bg-slate-800"
    activeClass="bg-sky-500! text-slate-950! border-sky-500!"
  />
  ```

---

## 🛠️ Props Reference

Property | Type | Default | Description
--- | --- | --- | ---
`totalItemsCount` | `number` | | **Required.** Total count of items inside your dataset.
`onChange` | `(pageNumber: number) => void` | | **Required.** Callback fired on page transitions.
`activePage` | `number` | `1` | Selected active page.
`itemsCountPerPage` | `number` | `10` | Size of a single page data block.
`pageRangeDisplayed` | `number` | `5` | Maximum number of visible numeric links.
`prevPageText` | `string \| ReactNode` | `⟨` | Text or React Node for the "Previous" link.
`firstPageText` | `string \| ReactNode` | `«` | Text or React Node for the "First" link.
`lastPageText` | `string \| ReactNode` | `»` | Text or React Node for the "Last" link.
`nextPageText` | `string \| ReactNode` | `⟩` | Text or React Node for the "Next" link.
`innerClass` | `string` | `"pagination"` | CSS class name applied to the wrapping `<ul>` element.
`activeClass` | `string` | `"active"` | CSS class name applied to the active `<li>` element.
`activeLinkClass` | `string` | `undefined` | CSS class name applied to the active `<a>` anchor tag.
`disabledClass` | `string` | `"disabled"` | CSS class name applied to inactive terminal links (First/Prev/Next/Last).
`hideDisabled` | `boolean` | `false` | Hide navigation links (first/prev/next/last) when they are disabled.
`hideNavigation` | `boolean` | `false` | Hide previous/next page links entirely.
`hideFirstLastPages` | `boolean` | `false` | Hide first/last page links entirely.
`itemClass` | `string` | `undefined` | General CSS class applied to all `<li>` tags.
`itemClassFirst` | `string` | `undefined` | Specific CSS class applied to the first `<li>` tag.
`itemClassPrev` | `string` | `undefined` | Specific CSS class applied to the previous `<li>` tag.
`itemClassNext` | `string` | `undefined` | Specific CSS class applied to the next `<li>` tag.
`itemClassLast` | `string` | `undefined` | Specific CSS class applied to the last `<li>` tag.
`linkClass` | `string` | `undefined` | General CSS class applied to all `<a>` tags.
`linkClassFirst` | `string` | `undefined` | Specific CSS class applied to the first `<a>` tag.
`linkClassPrev` | `string` | `undefined` | Specific CSS class applied to the previous `<a>` tag.
`linkClassNext` | `string` | `undefined` | Specific CSS class applied to the next `<a>` tag.
`linkClassLast` | `string` | `undefined` | Specific CSS class applied to the last `<a>` tag.

---

## 🧪 Development and Testing

If you want to contribute or test changes locally, you can use our built-in scripts:

### Running Unit Tests
Unit specifications are located in `/tests/components` and run under **Vitest**:
```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### Running the Live Playground App
To explore the live SaaS table view, themes, and interactive configurations:
```bash
# Serves the sandbox playground at http://localhost:8000
npm run demo
```

### Compiling the Library
To compile production bundle assets:
```bash
# Rebuilds CJS/ESM outputs and .d.ts files inside /dist
npm run build
```

---

## License

MIT © [Felipe Carrillo](https://github.com/felipecarrillo100)
