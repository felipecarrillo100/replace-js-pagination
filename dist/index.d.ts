import React from 'react';

interface PaginationProps {
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
declare const Pagination: React.FC<PaginationProps>;

interface PageProps {
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
declare const Page: React.FC<PageProps>;

interface PaginatorResult {
    total_pages: number;
    current_page: number;
    first_page: number;
    last_page: number;
    previous_page: number;
    next_page: number;
    has_previous_page: boolean;
    has_next_page: boolean;
}

export { Page, type PageProps, Pagination, type PaginationProps, type PaginatorResult, Pagination as default };
