import { createComparison, defaultRules } from "../lib/comparison.js";

export function initFiltering(elements, indexes = {}) {
  // @todo: #4.1 Заполнение выпадающих списков
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        return option;
      })
    );
  });

  // @todo: #4.3 Создание функции сравнения
  const compare = createComparison(defaultRules);

  return (data, state, action) => {
    // @todo: #4.2 Очистка полей фильтров (опционально)
    if (action && action.name === "clear") {
      const field = action.dataset.field;
      const parent =
        action.closest(".filter-wrapper") ||
        action.closest(".range-inputs")?.parentElement;
      if (parent) {
        const input = parent.querySelector("input");
        if (input) {
          input.value = "";
          state[field] = "";
        }
      }
    }

    // @todo: #4.5 Применение фильтрации
    return data.filter((row) => compare(row, state));
  };
}
