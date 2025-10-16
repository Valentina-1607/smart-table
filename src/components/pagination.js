import { getPages } from "../lib/pagination.js";

export function initPagination(elements, createPage) {
  const { pages, fromRow, toRow, totalRows } = elements;

  return (data, state, action) => {
    // @todo: #2.1 Промежуточные переменные
    const rowsPerPage = state.rowsPerPage;
    const pageCount = Math.ceil(data.length / rowsPerPage);
    let page = state.page;

    // @todo: #2.6 Обработка действий
    if (action)
      switch (action.name) {
        case "prev":
          page = Math.max(1, page - 1);
          break;
        case "next":
          page = Math.min(pageCount, page + 1);
          break;
        case "first":
          page = 1;
          break;
        case "last":
          page = pageCount;
          break;
      }

    // @todo: #2.3 Подготовка шаблона
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    // @todo: #2.4 Вывод кнопок страниц
    const visiblePages = getPages(page, pageCount, 5);
    pages.replaceChildren(
      ...visiblePages.map((pageNumber) => {
        const el = pageTemplate.cloneNode(true);
        return createPage(el, pageNumber, pageNumber === page);
      })
    );

    // @todo: #2.5 Вывод статуса
    fromRow.textContent = (page - 1) * rowsPerPage + 1;
    toRow.textContent = Math.min(page * rowsPerPage, data.length);
    totalRows.textContent = data.length;

    // @todo: #2.2 Возврат нужных строк
    const skip = (page - 1) * rowsPerPage;
    return data.slice(skip, skip + rowsPerPage);
  };
}
