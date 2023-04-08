import Link from "next/link";
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
  titleMapper: (block = {}) => {
    const title = block?.properties?.title || [];

    let view = title.map((i, index) => {
      let word = i[0];
      const initTag = i[1];

      let classType = "";
      let isLink = false;

      if (block.type === "quote") {
        initTag.map((zz) => {
          let tags = "";
          if (zz[0] === "b") tags = "font-bold";
          else if (zz[0] === "i") tags = "italic";
          else if (zz[0] === "a") isLink = zz;
          classType = `${classType} ${tags}`;
          return zz;
        });
      }

      if (isLink)
        return (
          <Link key={index} className={classType} href={isLink[1]}>
            {word}
          </Link>
        );

      return (
        <span key={index} className={classType}>
          {word}
        </span>
      );
    });

    return view;
  },
};

export default getNotion;
