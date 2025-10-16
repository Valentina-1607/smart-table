import { cloneTemplate } from "../lib/dom.js";

export function initTable({ before = [], after = [] } = {}) {
  const root = {
    container: cloneTemplate("table").container,
    elements: cloneTemplate("table").elements,
  };

  const rowTemplate = cloneTemplate("row");

  return {
    get container() {
      return root.container;
    },

    update(data, state, onAction) {
      // @todo: #1.1 Вывести строки данных
      const nextRows = data.map((item) => {
        const row = cloneTemplate(rowTemplate);

        // Перебираем ключи данных и заполняем элементы строки
        Object.keys(item).forEach((key) => {
          if (row.elements[key]) {
            row.elements[key].textContent = item[key];
          }
        });

        return row.container;
      });

      root.elements.rows.replaceChildren(...nextRows);

      // @todo: #1.2 Добавить дополнительные шаблоны
      before.reverse().forEach((subName) => {
        root[subName] = cloneTemplate(subName);
        root.container.prepend(root[subName].container);
      });

      after.forEach((subName) => {
        root[subName] = cloneTemplate(subName);
        root.container.append(root[subName].container);
      });

      // @todo: #1.3 Обработка событий
      root.container.addEventListener("change", () => onAction());
      root.container.addEventListener("reset", () => setTimeout(onAction));
      root.container.addEventListener("submit", (e) => {
        e.preventDefault();
        onAction(e.submitter);
      });

      return root;
    },
  };
}
