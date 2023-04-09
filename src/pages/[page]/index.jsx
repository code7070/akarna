import { useNotionProvider } from "@/context/notion";
import getNotion from "@/notion/getNotion";
import NotionRenderer from "@/notion/renderer";
import pageConfig from "@/page-config";
import { notionAPI } from "@/utils/notion-api";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const page = await notionAPI.getPage(pageConfig.homeId);
  const pageMap = getNotion.pageMapNav(page?.block);

  const paths = pageMap.map((i) => ({ params: { page: i.path } }));
  console.log("STATIC PATHS: ", paths);
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { page } = context.params;

  const res = await notionAPI.getPage(pageConfig.homeId);
  const pageMap = getNotion.pageMapNav(res?.block);

  const target = pageMap.find((i) => i.path === page);
  console.log("STATIC PROPS: ", target);
  const notionPage = await notionAPI.getPage(target?.pageId);

  return {
    props: {
      notionPage,
      page,
    },
  };
}

export default function SubPage(props) {
  const { back } = useRouter();
  const [notion] = useNotionProvider();

  console.log("SUB: ", { notion, props });

  return (
    <div className="max-w-xl mx-auto">
      <NotionRenderer notionMap={props.notionPage} />
    </div>
  );
}
