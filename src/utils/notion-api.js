import { NotionAPI } from "notion-client";
import { parsePageId } from "notion-utils";

const notion = new NotionAPI();

export const notionAPI = {
  getPage: async (pageId) => {
    return await notion
      .getPage(parsePageId(pageId))
      .then((res) => res)
      .catch((err) => null);
  },
};
