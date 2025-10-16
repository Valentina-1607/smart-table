import {
  createComparison,
  rules,
  skipEmptyTargetValues,
} from "../lib/comparison.js";

export function initSearching(searchField) {
  return (data, state, action) => {
    const searchValue = state[searchField];

    if (!searchValue) {
      return data;
    }

    const compare = createComparison([
      skipEmptyTargetValues,
      rules.searchMultipleFields(
        searchField,
        ["date", "customer", "seller"],
        false
      ),
    ]);

    return data.filter((row) => compare(row, state));
  };
}
