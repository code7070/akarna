import PageHead from "./PageHead";
import { parsePageId } from "notion-utils";
import NotionRenderer from "@/notion/renderer";
import { NotionAPI } from "notion-client";
import pageConfig from "@/page-config";
import { setHomepage, setPageNav } from "@/store/pageSlice";
import getNotion from "@/notion/getNotion";
import { wrapper } from "@/store";

const pageTarget = parsePageId(pageConfig.homeId);

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const notion = new NotionAPI();
    const res = await notion
      .getPage(pageTarget)
      .then((res) => res)
      .catch((res) => null);
    const pageNav = getNotion.pageMapNav(res.block);
    store.dispatch(setHomepage(res));
    store.dispatch(setPageNav(pageNav));
    return { props: { page: res } };
  }
);

let num = 1;

export default function Home({ page = {} }) {
  //
  //

  return (
    <>
      <PageHead />

      <div className="max-w-3xl my-8 mx-auto border-2 border-slate-200 rounded-lg p-4">
        <NotionRenderer notionMap={page} />
      </div>
    </>
  );
}
