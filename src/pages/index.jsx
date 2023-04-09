import PageHead from "./PageHead";
import NotionRenderer from "@/notion/renderer";
import pageConfig from "@/page-config";
import getNotion from "@/notion/getNotion";
import { useNotionProvider } from "@/context/notion";
import { useEffect } from "react";
import { notionAPI } from "@/utils/notion-api";

export const getStaticProps = async (context) => {
  const res = await notionAPI.getPage(pageConfig.homeId);
  return { props: { page: res } };
};

export default function Home({ page = {} }) {
  const [notion, setNotion] = useNotionProvider();

  //
  useEffect(() => {
    if (page && setNotion) {
      console.log("RENDER-");
      const navigation = getNotion.pageMapNav(page?.block);
      setNotion({ homepage: page, navigation });
    }
  }, [page, setNotion]);
  //

  console.log("HOME NOTION: ", notion);

  return (
    <>
      <PageHead />
      <div className="max-w-3xl my-8 mx-auto border-2 border-slate-200 rounded-lg p-4">
        <NotionRenderer notionMap={page} />
      </div>
    </>
  );
}
