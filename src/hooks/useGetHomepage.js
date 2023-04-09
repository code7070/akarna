import { useNotionProvider } from "@/context/notion";
import getNotion from "@/notion/getNotion";
import pageConfig from "@/page-config";
import { notionAPI } from "@/utils/notion-api";
import { useEffect } from "react";

export default function useGetHomepage() {
  const [notion, setNotion] = useNotionProvider();

  useEffect(() => {
    const calls = async () => {
      const res = await notionAPI.getPage(pageConfig.homeId);
      const navigation = getNotion.pageMapNav(res?.block);
      setNotion({ homepage: res, navigation });
    };

    if (!notion) {
      calls();
    }
  }, [notion, setNotion]);
}
