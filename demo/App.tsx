import React, { useState, useMemo } from "react";
import Pagination from "replace-js-pagination";
import "./App.css";

interface TechProduct {
  id: number;
  name: string;
  category: string;
  status: "Active" | "Stable" | "Beta" | "Experimental";
  rating: number;
  icon: string;
}

const DEV_PRODUCTS: TechProduct[] = [
  { id: 1, name: "Vite 8", category: "Build Tooling", status: "Stable", rating: 4.9, icon: "⚡" },
  { id: 2, name: "React Compiler", category: "Core Framework", status: "Beta", rating: 4.8, icon: "⚛️" },
  { id: 3, name: "TypeScript 5.7", category: "Languages", status: "Stable", rating: 5.0, icon: "📘" },
  { id: 4, name: "Vitest 4", category: "Testing Frameworks", status: "Stable", rating: 4.7, icon: "🧪" },
  { id: 5, name: "tsup 8", category: "Module Bundling", status: "Stable", rating: 4.8, icon: "📦" },
  { id: 6, name: "Next.js 15", category: "React Frameworks", status: "Stable", rating: 4.9, icon: "▲" },
  { id: 7, name: "Tailwind CSS v4", category: "Design System", status: "Stable", rating: 4.9, icon: "🎨" },
  { id: 8, name: "Biome", category: "Formatting & Linting", status: "Stable", rating: 4.6, icon: "🛠️" },
  { id: 9, name: "Zustand", category: "State Management", status: "Stable", rating: 4.9, icon: "🐻" },
  { id: 10, name: "tRPC", category: "API Clients", status: "Stable", rating: 4.8, icon: "🔌" },
  { id: 11, name: "Prisma", category: "Database ORM", status: "Stable", rating: 4.7, icon: "⏵" },
  { id: 12, name: "Supabase", category: "Backend-as-a-Service", status: "Stable", rating: 4.9, icon: "⚡" },
  { id: 13, name: "Astro 5", category: "Static Site Gen", status: "Stable", rating: 4.8, icon: "🚀" },
  { id: 14, name: "Esbuild", category: "Compilers", status: "Stable", rating: 4.9, icon: "🔨" },
  { id: 15, name: "ElysiaJS", category: "Backend Servers", status: "Beta", rating: 4.7, icon: "🦊" },
  { id: 16, name: "Bun 1.2", category: "Runtimes", status: "Stable", rating: 4.8, icon: "🥯" },
  { id: 17, name: "Drizzle ORM", category: "Database ORM", status: "Stable", rating: 4.8, icon: "🌧️" },
  { id: 18, name: "Playwright", category: "E2E Testing", status: "Stable", rating: 4.9, icon: "🎭" },
  { id: 19, name: "SolidJS", category: "Core Framework", status: "Stable", rating: 4.6, icon: "🔵" },
  { id: 20, name: "Qwik", category: "Core Framework", status: "Beta", rating: 4.5, icon: "⚡" },
  { id: 21, name: "Deno 2", category: "Runtimes", status: "Stable", rating: 4.7, icon: "🦕" },
  { id: 22, name: "TanStack Query", category: "State Management", status: "Stable", rating: 4.9, icon: "🐙" },
  { id: 23, name: "Panda CSS", category: "Design System", status: "Beta", rating: 4.4, icon: "🐼" },
  { id: 24, name: "MSW (Mock Service Worker)", category: "Testing Tools", status: "Stable", rating: 4.8, icon: "🌐" },
  { id: 25, name: "Turborepo", category: "Build Tooling", status: "Stable", rating: 4.7, icon: "🌀" },
  { id: 26, name: "Framer Motion", category: "Animation Libraries", status: "Stable", rating: 4.9, icon: "🔮" },
  { id: 27, name: "Radix UI", category: "Design System", status: "Stable", rating: 4.8, icon: "🧩" },
  { id: 28, name: "Shadcn UI", category: "Design System", status: "Stable", rating: 4.9, icon: "💻" },
  { id: 29, name: "Hono", category: "Backend Servers", status: "Stable", rating: 4.8, icon: "🔥" },
  { id: 30, name: "Nuxt 3", category: "Vue Frameworks", status: "Stable", rating: 4.8, icon: "💚" },
  { id: 31, name: "SvelteKit", category: "Svelte Frameworks", status: "Stable", rating: 4.7, icon: "🧡" },
  { id: 32, name: "Fastify", category: "Backend Servers", status: "Stable", rating: 4.8, icon: "⚡" },
  { id: 33, name: "Cypress", category: "Testing Tools", status: "Stable", rating: 4.6, icon: "🌲" },
  { id: 34, name: "Preact", category: "Core Framework", status: "Stable", rating: 4.5, icon: "⚛️" },
  { id: 35, name: "Lighthouse", category: "Performance Audit", status: "Stable", rating: 4.8, icon: "💡" },
  { id: 36, name: "Webpack 5", category: "Legacy Tooling", status: "Stable", rating: 4.1, icon: "📦" },
  { id: 37, name: "Babel", category: "Legacy Tooling", status: "Stable", rating: 4.0, icon: "🐠" },
  { id: 38, name: "Gulp", category: "Legacy Tooling", status: "Stable", rating: 3.5, icon: "🍷" },
  { id: 39, name: "Redux Toolkit", category: "State Management", status: "Stable", rating: 4.6, icon: "🟣" },
  { id: 40, name: "MobX", category: "State Management", status: "Stable", rating: 4.4, icon: "🧬" },
  { id: 41, name: "Valtio", category: "State Management", status: "Stable", rating: 4.7, icon: "💊" },
  { id: 42, name: "Jotai", category: "State Management", status: "Stable", rating: 4.8, icon: "👻" },
  { id: 43, name: "Recoil", category: "State Management", status: "Experimental", rating: 4.1, icon: "🌀" },
  { id: 44, name: "Apollo Client", category: "API Clients", status: "Stable", rating: 4.5, icon: "🚀" },
  { id: 45, name: "Urql", category: "API Clients", status: "Stable", rating: 4.6, icon: "⚡" },
  { id: 46, name: "RxJS", category: "Reactive Programming", status: "Stable", rating: 4.3, icon: "🧲" },
  { id: 47, name: "PostCSS", category: "Design System", status: "Stable", rating: 4.7, icon: "📮" },
  { id: 48, name: "Sass", category: "Design System", status: "Stable", rating: 4.7, icon: "👓" },
  { id: 49, name: "Less", category: "Design System", status: "Stable", rating: 4.2, icon: "🎨" },
  { id: 50, name: "Vitest UI", category: "Testing Tools", status: "Stable", rating: 4.8, icon: "📊" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pageRange, setPageRange] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"table" | "styles" | "docs">("table");

  // Filtering products
  const filteredProducts = useMemo(() => {
    return DEV_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const normalizedPage = Math.min(currentPage, totalPages);

  // Paginated items
  const paginatedItems = useMemo(() => {
    const startIdx = (normalizedPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, normalizedPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      {/* Enterprise Header */}
      <header className="app-header">
        <div className="header-meta">
          <span className="meta-tag">v2.0.0</span>
          <span className="meta-separator">•</span>
          <span className="meta-tag">TypeScript Native</span>
          <span className="meta-separator">•</span>
          <span className="meta-tag font-compiler">React Compiler Ready</span>
        </div>
        <h1>replace-js-pagination</h1>
        <p className="app-description">
          A high-performance, production-ready React pagination library. Designed as a drop-in replacement with zero dependencies and pristine modern API.
        </p>

        {/* Tab Controls */}
        <div className="tabs-container">
          <button
            className={activeTab === "table" ? "tab-link active" : "tab-link"}
            onClick={() => setActiveTab("table")}
          >
            📊 Data Registry
          </button>
          <button
            className={activeTab === "styles" ? "tab-link active" : "tab-link"}
            onClick={() => setActiveTab("styles")}
          >
            🎨 Styling Themes
          </button>
          <button
            className={activeTab === "docs" ? "tab-link active" : "tab-link"}
            onClick={() => setActiveTab("docs")}
          >
            📘 API Docs
          </button>
        </div>
      </header>

      {/* Main Console Workspace */}
      <main className="app-main">
        {activeTab === "table" && (
          <div className="table-workspace">
            {/* Filter Bar & Controls */}
            <div className="workspace-controls">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Filter by technology or category..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="search-input"
                />
              </div>

              <div className="params-selector">
                <div className="param-item">
                  <label htmlFor="items-per-page">Rows:</label>
                  <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="styled-select"
                  >
                    <option value={5}>5 rows</option>
                    <option value={10}>10 rows</option>
                    <option value={15}>15 rows</option>
                  </select>
                </div>

                <div className="param-item">
                  <label htmlFor="page-range">Range:</label>
                  <select
                    id="page-range"
                    value={pageRange}
                    onChange={(e) => setPageRange(Number(e.target.value))}
                    className="styled-select"
                  >
                    <option value={3}>3 pages</option>
                    <option value={5}>5 pages</option>
                    <option value={7}>7 pages</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SaaS Data Table */}
            <div className="table-container">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th className="col-id">ID</th>
                    <th className="col-name">Technology</th>
                    <th className="col-category">Category</th>
                    <th className="col-status">Status</th>
                    <th className="col-rating">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.length > 0 ? (
                    paginatedItems.map((prod) => (
                      <tr key={prod.id} className="table-row">
                        <td className="cell-id">#{prod.id}</td>
                        <td className="cell-name">
                          <span className="tech-icon">{prod.icon}</span>
                          <span className="tech-name">{prod.name}</span>
                        </td>
                        <td className="cell-category">{prod.category}</td>
                        <td className="cell-status">
                          <span className={`status-pill pill-${prod.status.toLowerCase()}`}>
                            {prod.status}
                          </span>
                        </td>
                        <td className="cell-rating">⭐ {prod.rating.toFixed(1)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="table-empty">
                        <span className="empty-emoji">📂</span>
                        <div className="empty-title">No technologies found</div>
                        <div className="empty-sub">Adjust your search query or reset filter to see results.</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Table Control Bar */}
            <div className="table-footer">
              <div className="footer-stats">
                Showing <strong>{(normalizedPage - 1) * itemsPerPage + 1}</strong> -{" "}
                <strong>{Math.min(normalizedPage * itemsPerPage, totalItems)}</strong> of{" "}
                <strong>{totalItems}</strong> entries
              </div>

              {/* Theme: Enterprise Slate Pagination */}
              <div className="footer-pagination">
                <Pagination
                  activePage={normalizedPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={totalItems}
                  pageRangeDisplayed={pageRange}
                  onChange={handlePageChange}
                  innerClass="enterprise-pagination"
                  itemClass="page-item"
                  activeClass="active"
                  disabledClass="disabled"
                  firstPageText="First"
                  lastPageText="Last"
                  prevPageText="Previous"
                  nextPageText="Next"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "styles" && (
          <div className="styles-showcase">
            <div className="showcase-card">
              <div className="showcase-header">
                <h3>SaaS Slate Theme</h3>
                <p>Clean, flat, high-density pagination designed for modern dashboard environments.</p>
              </div>
              <div className="showcase-render">
                <Pagination
                  activePage={3}
                  itemsCountPerPage={10}
                  totalItemsCount={120}
                  pageRangeDisplayed={5}
                  onChange={() => {}}
                  innerClass="enterprise-pagination"
                  itemClass="page-item"
                  activeClass="active"
                  disabledClass="disabled"
                  firstPageText="First"
                  lastPageText="Last"
                  prevPageText="Previous"
                  nextPageText="Next"
                />
              </div>
            </div>

            <div className="showcase-card">
              <div className="showcase-header">
                <h3>Traditional Bootstrap Theme</h3>
                <p>Ensures perfect backward compatibility with classic Bootstrap 3/4/5 styled wrappers.</p>
              </div>
              <div className="showcase-render">
                <Pagination
                  activePage={2}
                  itemsCountPerPage={10}
                  totalItemsCount={50}
                  pageRangeDisplayed={5}
                  onChange={() => {}}
                  innerClass="pagination bootstrap-classic"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="active"
                  disabledClass="disabled"
                />
              </div>
            </div>

            <div className="showcase-card">
              <div className="showcase-header">
                <h3>Minimalist Dot Theme</h3>
                <p>Sleek, round numerical buttons with subtle hover scaling and clear boundaries.</p>
              </div>
              <div className="showcase-render">
                <Pagination
                  activePage={4}
                  itemsCountPerPage={10}
                  totalItemsCount={80}
                  pageRangeDisplayed={5}
                  onChange={() => {}}
                  innerClass="minimal-pagination"
                  itemClass="dot-item"
                  activeClass="active"
                  disabledClass="disabled"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="docs-workspace">
            <div className="showcase-header">
              <h3>Prop Reference</h3>
              <p>Highly compatible with legacy <code>react-js-pagination</code> APIs, making migration trivial.</p>
            </div>
            <div className="table-container">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>totalItemsCount</code></td>
                    <td><code>number</code></td>
                    <td className="default-val">Required</td>
                    <td>Total items of your filtered dataset.</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(page: number) =&gt; void</code></td>
                    <td className="default-val">Required</td>
                    <td>Callback fired when clicking pagination items.</td>
                  </tr>
                  <tr>
                    <td><code>activePage</code></td>
                    <td><code>number</code></td>
                    <td className="default-val"><code>1</code></td>
                    <td>Selected active page pageNumber.</td>
                  </tr>
                  <tr>
                    <td><code>itemsCountPerPage</code></td>
                    <td><code>number</code></td>
                    <td className="default-val"><code>10</code></td>
                    <td>Items rendered inside one page block.</td>
                  </tr>
                  <tr>
                    <td><code>pageRangeDisplayed</code></td>
                    <td><code>number</code></td>
                    <td className="default-val"><code>5</code></td>
                    <td>Size of visible page pageNumber lists.</td>
                  </tr>
                  <tr>
                    <td><code>innerClass</code></td>
                    <td><code>string</code></td>
                    <td className="default-val"><code>"pagination"</code></td>
                    <td>Class applied to the wrapping <code>UL</code> tag.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 replace-js-pagination. Released under the MIT License.</p>
      </footer>
    </div>
  );
}
