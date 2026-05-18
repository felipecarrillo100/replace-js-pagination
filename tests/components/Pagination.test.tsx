import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../../src/components/Pagination";

describe("<Pagination />", () => {
  const props = {
    totalItemsCount: 20,
    onChange: vi.fn(),
  };

  describe("render()", () => {
    it("renders a UL tag with correct class", () => {
      render(<Pagination {...props} innerClass="pagination list-inline center-block text-center" />);
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass("pagination");
      expect(list).toHaveClass("list-inline");
      expect(list).toHaveClass("center-block");
      expect(list).toHaveClass("text-center");
    });

    it("renders the appropriate amount of children", () => {
      render(<Pagination {...props} />);
      const items = screen.getAllByRole("listitem");
      // totalItemsCount = 20, itemsPerPage = 10 (default), pageRangeDisplayed = 5.
      // Pages: First, Prev, 1, 2, Next, Last. Total = 6 elements!
      expect(items.length).toBe(6);
    });

    it("renders the navigation labels", () => {
      render(<Pagination {...props} prevPageText="⟨" firstPageText="«" nextPageText="⟩" lastPageText="»" />);
      const items = screen.getAllByRole("listitem");
      expect(items[0]).toHaveTextContent("«");
      expect(items[1]).toHaveTextContent("⟨");
      expect(items[4]).toHaveTextContent("⟩");
      expect(items[5]).toHaveTextContent("»");
    });

    it("passes down disabledClass to the prev, first, next and last pages when appropriate", () => {
      const disabledClass = "somethingElse";
      render(
        <Pagination {...props} hideDisabled={false} totalItemsCount={1} disabledClass={disabledClass} />
      );

      const items = screen.getAllByRole("listitem");
      // totalItemsCount = 1 -> Pages: First (disabled), Prev (disabled), 1 (active), Next (disabled), Last (disabled). Total = 5 elements.
      expect(items.length).toBe(5);
      expect(items[0]).toHaveClass(disabledClass);
      expect(items[1]).toHaveClass(disabledClass);
      expect(items[3]).toHaveClass(disabledClass);
      expect(items[4]).toHaveClass(disabledClass);
    });

    it("passes down itemClass to the prev, first, next and last pages", () => {
      const itemClass = "somethingElse";
      render(
        <Pagination {...props} hideDisabled={false} totalItemsCount={1} itemClass={itemClass} />
      );

      const items = screen.getAllByRole("listitem");
      expect(items[0]).toHaveClass(itemClass);
      expect(items[1]).toHaveClass(itemClass);
      expect(items[3]).toHaveClass(itemClass);
      expect(items[4]).toHaveClass(itemClass);
    });

    it("passes down linkClass to the prev, first, next and last pages links", () => {
      const linkClass = "somethingElse";
      render(
        <Pagination {...props} hideDisabled={false} totalItemsCount={1} linkClass={linkClass} />
      );

      const links = screen.getAllByRole("link");
      expect(links[0]).toHaveClass(linkClass);
      expect(links[1]).toHaveClass(linkClass);
      expect(links[3]).toHaveClass(linkClass);
      expect(links[4]).toHaveClass(linkClass);
    });

    it("assigns linkClassFirst to first link and itemClassFirst to first item", () => {
      render(
        <Pagination
          {...props}
          hideDisabled={false}
          totalItemsCount={1}
          linkClass="link"
          linkClassFirst="first-link"
          itemClass="item"
          itemClassFirst="first-item"
        />
      );

      const items = screen.getAllByRole("listitem");
      const links = screen.getAllByRole("link");

      expect(items[0]).toHaveClass("first-item");
      expect(items[1]).not.toHaveClass("first-item");

      expect(links[0]).toHaveClass("first-link");
      expect(links[1]).not.toHaveClass("first-link");
    });

    it("assigns linkClassPrev to prev link and itemClassPrev to prev list item", () => {
      render(
        <Pagination
          {...props}
          hideDisabled={false}
          totalItemsCount={80}
          linkClass="link"
          linkClassPrev="prev-link"
          itemClass="item"
          itemClassPrev="prev-item"
        />
      );

      const items = screen.getAllByRole("listitem");
      const links = screen.getAllByRole("link");

      expect(items[1]).toHaveClass("prev-item");
      expect(items[2]).not.toHaveClass("prev-item");

      expect(links[1]).toHaveClass("prev-link");
      expect(links[2]).not.toHaveClass("prev-link");
    });

    it("assigns linkClassNext to next link and itemClassNext to next list item", () => {
      render(
        <Pagination
          {...props}
          hideDisabled={false}
          totalItemsCount={80}
          linkClass="link"
          linkClassNext="next-link"
          itemClass="item"
          itemClassNext="next-item"
        />
      );

      const items = screen.getAllByRole("listitem");
      const links = screen.getAllByRole("link");

      // totalItemsCount = 80, activePage = 1 (default), itemsCountPerPage = 10, range = 5
      // Pages: First, Prev, 1, 2, 3, 4, 5, Next, Last. Total = 9 items.
      // Next is index 7.
      expect(items[7]).toHaveClass("next-item");
      expect(items[6]).not.toHaveClass("next-item");

      expect(links[7]).toHaveClass("next-link");
      expect(links[6]).not.toHaveClass("next-link");
    });

    it("assigns linkClassLast to last link and itemClassLast to last list item", () => {
      render(
        <Pagination
          {...props}
          hideDisabled={false}
          totalItemsCount={80}
          linkClass="link"
          linkClassLast="last-link"
          itemClass="item"
          itemClassLast="last-item"
        />
      );

      const items = screen.getAllByRole("listitem");
      const links = screen.getAllByRole("link");

      // Last is index 8 (total items = 9)
      expect(items[8]).toHaveClass("last-item");
      expect(items[7]).not.toHaveClass("last-item");

      expect(links[8]).toHaveClass("last-link");
      expect(links[7]).not.toHaveClass("last-link");
    });
  });
});
