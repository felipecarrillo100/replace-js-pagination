export interface PaginatorResult {
  total_pages: number;
  current_page: number;
  first_page: number;
  last_page: number;
  previous_page: number;
  next_page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
}

export class Paginator {
  private itemsCountPerPage: number;
  private pageRangeDisplayed: number;

  constructor(itemsCountPerPage: number, pageRangeDisplayed: number) {
    this.itemsCountPerPage = itemsCountPerPage || 10;
    this.pageRangeDisplayed = pageRangeDisplayed || 5;
  }

  build(totalItemsCount: number, activePage: number): PaginatorResult {
    let total_pages = Math.ceil(totalItemsCount / this.itemsCountPerPage);
    if (total_pages < 0) {
      total_pages = 0;
    }

    let current_page = activePage;
    if (current_page > total_pages) {
      current_page = total_pages;
    }
    if (current_page < 1) {
      current_page = 1;
    }

    let first_page = Math.max(1, current_page - Math.floor(this.pageRangeDisplayed / 2));
    const last_page = Math.min(total_pages, first_page + this.pageRangeDisplayed - 1);

    if (last_page - first_page + 1 < this.pageRangeDisplayed) {
      first_page = Math.max(1, last_page - this.pageRangeDisplayed + 1);
    }

    const previous_page = current_page - 1;
    const next_page = current_page + 1;
    const has_previous_page = current_page > 1;
    const has_next_page = current_page < total_pages;

    return {
      total_pages,
      current_page,
      first_page,
      last_page,
      previous_page,
      next_page,
      has_previous_page,
      has_next_page,
    };
  }
}

export default Paginator;
