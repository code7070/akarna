import Link from "next/link";
import getNotion from "./getNotion";
import { parsePageId } from "notion-utils";
import pageConfig from "@/page-config";

const Picture = ({ block }) => {
  console.log("Picture: ", block);
  const src = encodeURIComponent(block?.properties?.source?.[0]);
  const params = `?table=${block.parent_table}&id=${block.id}&cache=v2`;
  const fullSrc = `https://notion.so/image/${src}${params}`;
  if (src) return <img alt="hehe" src={fullSrc} />;
  return "";
};

export default function NotionRenderer({
  notionMap = { block: {}, collection_view: {}, collection: {} },
}) {
  const block = notionMap?.block;

  const { content: pageContent, id: parentId } = getNotion.pageContent(block);
  const blockLists = getNotion.blocksList(block);

  console.log(blockLists);

  const Header = ({ block }) => {
    if (block.type === "header")
      return <h2 className="text-2xl">{block?.properties?.title[0]}</h2>;
    else if (block.type === "sub_header")
      return <h3 className="text-xl">{block?.properties?.title[0]}</h3>;
    else if (block.type === "sub_sub_header")
      return <h4 className="text-lg">{block?.properties?.title[0]}</h4>;
    return <div>{block?.properties?.title[0]}</div>;
  };

  const PageLink = ({ block }) => {
    let link = `/${parentId}/${block.id}`;
    if (parentId === parsePageId(pageConfig.homeId)) link = `/${block.id}`;
    return (
      <div>
        <Link href={link} className="text-slate-400 hover:underline">
          {block?.properties?.title[0]}
        </Link>
      </div>
    );
  };

  const Column = ({ block }) => {
    const width = `calc(100% * ${block?.format?.column_ratio || 1})`;
    return (
      <div style={{ width }} className="flex-1">
        {block?.content.map((b) => {
          const block = blockLists.find((f) => f.id === b);
          return <Block key={b} block={block} />;
        })}
      </div>
    );
  };

  const Columns = ({ block }) => {
    const content = block?.content;
    return (
      <div className="flex gap-1 border-2 border-red-200 w-full">
        {content?.map((i) => {
          const block = blockLists.find((x) => x.id === i);
          return <Column key={i} block={block} />;
        })}
      </div>
    );
  };

  const Block = ({ block }) => {
    if (block.type === "page") return <PageLink block={block} />;
    else if (`${block.type}`.includes("header"))
      return <Header key={block.id} block={block} />;
    else if (block.type === "column_list") return <Columns block={block} />;

    const titleDisplay = getNotion.titleMapper(block);

    return <div>{titleDisplay}</div>;
  };

  return pageContent?.map((i) => {
    let block = {};
    block = blockLists.find((x) => x.id === i);

    if (!block) return "";

    return <Block key={block.id} block={block} />;
  });
}
