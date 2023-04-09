import NotionRenderer from "@/notion/renderer";
import pageConfig from "@/page-config";
import { selectPage } from "@/store/pageSlice";
import { useRouter } from "next/router";
import { NotionAPI } from "notion-client";
import { useSelector } from "react-redux";

export function getStaticPaths() {
  return {
    paths: [{ params: { page: pageConfig.homeId } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const notion = new NotionAPI();
  const notionPage = await notion.getPage(params.page);

  return {
    props: {
      notionPage,
    },
  };
}

export default function SubPage({ notionPage }) {
  const { back } = useRouter();
  const pageg = useSelector(selectPage.page);
  console.log("[page]: ", { pageg });
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex bg-primary justify-between">
        <button className="btn btn-secondary" type="button" onClick={back}>
          Home
        </button>
        <h1>Sub Page</h1>
      </div>
      <NotionRenderer notionMap={notionPage} />
    </div>
  );
}
