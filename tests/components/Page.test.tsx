import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../../src/components/Page";

describe("<Page />", () => {
  const defaultProps = {
    pageNumber: 1,
    onClick: vi.fn(),
    pageText: "1",
    isActive: false,
  };

  it("renders a list item with an anchor", () => {
    render(<Page {...defaultProps} />);
    const listItem = screen.getByRole("listitem");
    const link = screen.getByRole("link");

    expect(listItem).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("1");
    expect(link).toHaveAttribute("href", "#");
  });

  it("sets the active class if activePage is active", () => {
    render(<Page {...defaultProps} isActive={true} />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveClass("active");
  });

  it("sets the disabled class if activePage is disabled", () => {
    render(<Page {...defaultProps} isDisabled={true} />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveClass("disabled");
  });

  it("assigns a custom itemClass to list item and linkClass to link", () => {
    render(<Page {...defaultProps} itemClass="page-item" linkClass="page-link" />);
    const listItem = screen.getByRole("listitem");
    const link = screen.getByRole("link");

    expect(listItem).toHaveClass("page-item");
    expect(link).toHaveClass("page-link");
  });

  it("calls onClick when clicked and not disabled", () => {
    const onClick = vi.fn();
    render(<Page {...defaultProps} onClick={onClick} />);
    const listItem = screen.getByRole("listitem");

    fireEvent.click(listItem);
    expect(onClick).toHaveBeenCalledWith(1);
  });

  it("does not call onClick when clicked and disabled", () => {
    const onClick = vi.fn();
    render(<Page {...defaultProps} onClick={onClick} isDisabled={true} />);
    const listItem = screen.getByRole("listitem");

    fireEvent.click(listItem);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders custom element text", () => {
    const elementText = <strong>Bold 1</strong>;
    render(<Page {...defaultProps} pageText={elementText} />);
    const link = screen.getByRole("link");
    expect(link.querySelector("strong")).toBeInTheDocument();
  });
});
