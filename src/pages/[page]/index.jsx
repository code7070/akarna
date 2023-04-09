import { useNotionProvider } from "@/context/notion";
import NotionRenderer from "@/notion/renderer";
import pageConfig from "@/page-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function getStaticPaths() {
  return {
    paths: [{ params: { page: pageConfig.homeId } }],
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  const { page } = context.params;

  return {
    props: {
      notionPage: {},
      page,
    },
  };
};

export default function SubPage(props) {
  const { back } = useRouter();
  const [notion] = useNotionProvider();

  console.log("SUB: ", { notion, props });

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
