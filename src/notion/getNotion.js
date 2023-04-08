import { parsePageId } from "notion-utils";

const getNotion = {
  pageContent: (notionBlock = {}) => {
    if (Object.values(notionBlock).length < 1) return [];
    const objValues = Object.values(notionBlock);
    const id = objValues[0].value.id;
    return (
      objValues.filter((i) => i.value?.id === parsePageId(id))[0]?.value || null
    );
  },
  blocksList: (blocks = {}) => {
    return Object.values(blocks)
      .filter((i) => i.role !== "none")
      .map((i) => i.value);
  },
};

export default getNotion;
