import { initData } from "./data.js";
import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";
import { processFormData } from "./lib/form.js";

const data = initData();
const indexes = data.indexes;

// Инициализация таблицы
const sampleTable = initTable({
  before: ["search", "header", "filter"],
  after: ["pagination"],
}).update(data.rows, {}, () => {});

// @todo: инициализация
const applyPagination = initPagination(
  sampleTable.pagination.elements,
  (el, page, isCurrent) => {
    const input = el.querySelector("input");
    const label = el.querySelector("span");
    input.value = page;
    input.checked = isCurrent;
    label.textContent = page;
    return el;
  }
);

const applySorting = initSorting([
  sampleTable.header.elements.sortByDate,
  sampleTable.header.elements.sortByTotal,
]);

const applyFiltering = initFiltering(sampleTable.filter.elements, {
  searchBySeller: indexes.sellers,
});

const applySearching = initSearching("search");

function collectState(form) {
  const state = processFormData(form);
  const rowsPerPage = parseInt(state.rowsPerPage);
  const page = parseInt(state.page ?? 1);

  return {
    ...state,
    rowsPerPage,
    page,
  };
}

function updateTable(action) {
  const state = collectState(sampleTable.container);
  let result = data.rows;

  // @todo: использование
  result = applySearching(result, state, action);
  result = applyFiltering(result, state, action);
  result = applySorting(result, state, action);
  result = applyPagination(result, state, action);

  sampleTable.update(result, state, updateTable);
}

// Добавляем таблицу на страницу
document.querySelector("#app").append(sampleTable.container);

// Первоначальное обновление
updateTable();
