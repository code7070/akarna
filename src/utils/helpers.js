export const isArrayLen = (arr = []) =>
  typeof arr === "object" && arr?.length > 0;

export const slugify = (str = "") =>
  `${str}`
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
