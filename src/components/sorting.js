import { sortMap, sortData } from "../lib/sorting.js";

export function initSorting(columns) {
  let field = null;
  let order = "none";

  return (data, state, action) => {
    // @todo: #3.3 Применение текущего режима сортировки
    columns.forEach((column) => {
      if (column.dataset.value !== "none") {
        field = column.dataset.field;
        order = column.dataset.value;
      }
    });

    // @todo: #3.1 Обработка действий сортировки
    if (action && action.name === "sort") {
      action.dataset.value = sortMap[action.dataset.value];
      field = action.dataset.field;
      order = action.dataset.value;

      // @todo: #3.2 Сброс состояния других кнопок
      columns.forEach((column) => {
        if (column.dataset.field !== action.dataset.field) {
          column.dataset.value = "none";
        }
      });
    }

    if (field && order !== "none") {
      return sortData(data, field, order);
    }

    return data;
  };
}
