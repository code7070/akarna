import NotionRenderer from "@/notion/renderer";
import pageConfig from "@/page-config";
import { NotionAPI } from "notion-client";

export function getStaticPaths() {
  return {
    paths: [
      { params: { page: pageConfig.homeId, subpage: pageConfig.homeId } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const notion = new NotionAPI();
  const notionPage = await notion.getPage(params.subpage);

  return {
    props: {
      notionPage,
    },
  };
}

export default function SubPage({ notionPage }) {
  return (
    <div className="max-w-xl mx-auto">
      <h1>Sub-Sub Page</h1>
      <NotionRenderer notionMap={notionPage} />
    </div>
  );
}
