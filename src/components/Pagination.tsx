import React, { useMemo } from "react";
import cx from "classnames";
import Paginator from "../utils/paginator";
import Page from "./Page";

export interface PaginationProps {
  totalItemsCount: number;
  onChange: (pageNumber: number) => void;
  activePage?: number;
  itemsCountPerPage?: number;
  pageRangeDisplayed?: number;
  prevPageText?: React.ReactNode;
  nextPageText?: React.ReactNode;
  lastPageText?: React.ReactNode;
  firstPageText?: React.ReactNode;
  disabledClass?: string;
  hideDisabled?: boolean;
  hideNavigation?: boolean;
  innerClass?: string;
  itemClass?: string;
  itemClassFirst?: string;
  itemClassPrev?: string;
  itemClassNext?: string;
  itemClassLast?: string;
  linkClass?: string;
  activeClass?: string;
  activeLinkClass?: string;
  linkClassFirst?: string;
  linkClassPrev?: string;
  linkClassNext?: string;
  linkClassLast?: string;
  hideFirstLastPages?: boolean;
  getPageUrl?: (pageNumber: number) => string;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItemsCount,
  onChange,
  activePage = 1,
  itemsCountPerPage = 10,
  pageRangeDisplayed = 5,
  prevPageText = "⟨",
  firstPageText = "«",
  nextPageText = "⟩",
  lastPageText = "»",
  disabledClass = "disabled",
  hideDisabled = false,
  hideNavigation = false,
  innerClass = "pagination",
  itemClass,
  itemClassFirst,
  itemClassPrev,
  itemClassNext,
  itemClassLast,
  linkClass,
  activeClass,
  activeLinkClass,
  linkClassFirst,
  linkClassPrev,
  linkClassNext,
  linkClassLast,
  hideFirstLastPages = false,
  getPageUrl = (_i: number) => "#",
}) => {
  const pages = useMemo(() => {
    const paginatorInstance = new Paginator(itemsCountPerPage, pageRangeDisplayed);
    const paginationInfo = paginatorInstance.build(totalItemsCount, activePage);

    const pagesList: React.ReactElement[] = [];

    // Core page numbers
    for (let i = paginationInfo.first_page; i <= paginationInfo.last_page; i++) {
      pagesList.push(
        <Page
          isActive={i === activePage}
          key={i}
          href={getPageUrl(i)}
          pageNumber={i}
          pageText={i + ""}
          onClick={onChange}
          itemClass={itemClass}
          linkClass={linkClass}
          activeClass={activeClass}
          activeLinkClass={activeLinkClass}
          ariaLabel={`Go to page number ${i}`}
        />
      );
    }

    // Previous Page Button
    const isPrevPageVisible = !hideNavigation && !(hideDisabled && !paginationInfo.has_previous_page);
    if (isPrevPageVisible) {
      pagesList.unshift(
        <Page
          key={"prev" + paginationInfo.previous_page}
          href={getPageUrl(paginationInfo.previous_page)}
          pageNumber={paginationInfo.previous_page}
          onClick={onChange}
          pageText={prevPageText}
          isDisabled={!paginationInfo.has_previous_page}
          itemClass={cx(itemClass, itemClassPrev)}
          linkClass={cx(linkClass, linkClassPrev)}
          disabledClass={disabledClass}
          ariaLabel="Go to previous page"
        />
      );
    }

    // First Page Button
    const isFirstPageVisible = !hideFirstLastPages && !(hideDisabled && !paginationInfo.has_previous_page);
    if (isFirstPageVisible) {
      pagesList.unshift(
        <Page
          key={"first"}
          href={getPageUrl(1)}
          pageNumber={1}
          onClick={onChange}
          pageText={firstPageText}
          isDisabled={!paginationInfo.has_previous_page}
          itemClass={cx(itemClass, itemClassFirst)}
          linkClass={cx(linkClass, linkClassFirst)}
          disabledClass={disabledClass}
          ariaLabel="Go to first page"
        />
      );
    }

    // Next Page Button
    const isNextPageVisible = !hideNavigation && !(hideDisabled && !paginationInfo.has_next_page);
    if (isNextPageVisible) {
      pagesList.push(
        <Page
          key={"next" + paginationInfo.next_page}
          href={getPageUrl(paginationInfo.next_page)}
          pageNumber={paginationInfo.next_page}
          onClick={onChange}
          pageText={nextPageText}
          isDisabled={!paginationInfo.has_next_page}
          itemClass={cx(itemClass, itemClassNext)}
          linkClass={cx(linkClass, linkClassNext)}
          disabledClass={disabledClass}
          ariaLabel="Go to next page"
        />
      );
    }

    // Last Page Button
    const isLastPageVisible = !hideFirstLastPages && !(hideDisabled && !paginationInfo.has_next_page);
    if (isLastPageVisible) {
      pagesList.push(
        <Page
          key={"last"}
          href={getPageUrl(paginationInfo.total_pages)}
          pageNumber={paginationInfo.total_pages}
          onClick={onChange}
          pageText={lastPageText}
          isDisabled={paginationInfo.current_page === paginationInfo.total_pages}
          itemClass={cx(itemClass, itemClassLast)}
          linkClass={cx(linkClass, linkClassLast)}
          disabledClass={disabledClass}
          ariaLabel="Go to last page"
        />
      );
    }

    return pagesList;
  }, [
    totalItemsCount,
    onChange,
    activePage,
    itemsCountPerPage,
    pageRangeDisplayed,
    prevPageText,
    firstPageText,
    nextPageText,
    lastPageText,
    disabledClass,
    hideDisabled,
    hideNavigation,
    itemClass,
    itemClassFirst,
    itemClassPrev,
    itemClassNext,
    itemClassLast,
    linkClass,
    activeClass,
    activeLinkClass,
    linkClassFirst,
    linkClassPrev,
    linkClassNext,
    linkClassLast,
    hideFirstLastPages,
    getPageUrl,
  ]);

  return <ul className={innerClass}>{pages}</ul>;
};

export default Pagination;
