import PageHead from "./PageHead";
import { parsePageId } from "notion-utils";
import NotionRenderer from "@/notion/renderer";
import { NotionAPI } from "notion-client";
import pageConfig from "@/page-config";

const pageTarget = parsePageId(pageConfig.homeId);

export async function getStaticProps() {
  const notion = new NotionAPI();
  const res = await notion
    .getPage(pageTarget)
    .then((res) => res)
    .catch((res) => null);

  return { props: { page: res } };
}

export default function Home({ page = {} }) {
  //

  //

  return (
    <>
      <PageHead />
      <div className="max-w-2xl my-8 mx-auto border-2 border-slate-200 rounded-lg p-4">
        heeheheh
        <NotionRenderer notionMap={page} />
      </div>
    </>
  );
}
