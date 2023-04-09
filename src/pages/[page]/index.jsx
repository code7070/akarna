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

export const getStaticProps = getStaticProps(async (context) => {
  const { page } = context.params;

  // const match = store.getState((state) => selectPage(state, page));

  const notion = new NotionAPI();
  // const notionPage = await notion.getPage(page);

  return {
    props: {
      notionPage: {},
      // match,
    },
  };
});

export default function SubPage(props) {
  const { back } = useRouter();
  const sels = useSelector(selectPage.home);
  const selss = useSelector(selectPage.navigation);
  console.log("SUB: ", { props, sels, selss });
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex bg-primary justify-between">
        <button className="btn btn-secondary" type="button" onClick={back}>
          Home
        </button>
        <h1>Sub Page</h1>
      </div>
      <NotionRenderer notionMap={props.notionPage} />
    </div>
  );
}
