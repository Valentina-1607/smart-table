import dataset from "./dataset.js";

export function initData() {
  const indexes = {
    sellers: [...new Set(dataset.map((row) => row.seller))].reduce(
      (acc, seller) => {
        acc[seller] = seller;
        return acc;
      },
      {}
    ),
  };

  const rows = dataset.map((row, id) => ({
    id,
    ...row,
  }));

  return { rows, indexes };
}
