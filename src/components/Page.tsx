import React from "react";
import cx from "classnames";

export interface PageProps {
  pageText: React.ReactNode;
  pageNumber: number;
  onClick: (pageNumber: number) => void;
  isActive?: boolean;
  isDisabled?: boolean;
  activeClass?: string;
  activeLinkClass?: string;
  itemClass?: string;
  linkClass?: string;
  disabledClass?: string;
  href?: string;
  ariaLabel?: string;
}

export const Page: React.FC<PageProps> = ({
  pageText,
  pageNumber,
  onClick,
  isActive = false,
  isDisabled = false,
  activeClass = "active",
  activeLinkClass,
  itemClass,
  linkClass,
  disabledClass = "disabled",
  href = "#",
  ariaLabel,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    onClick(pageNumber);
  };

  const css = cx(itemClass, {
    [activeClass]: isActive,
    [disabledClass]: isDisabled,
  });

  const linkCss = cx(linkClass, {
    [activeLinkClass || ""]: isActive && activeLinkClass,
  });

  return (
    <li className={css} onClick={handleClick}>
      <a className={linkCss} href={href} aria-label={ariaLabel}>
        {pageText}
      </a>
    </li>
  );
};

export default Page;
