import { Playfair_Display } from "next/font/google";
import "@/styles/globals.scss";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import Header from "@/components/header";
import "nprogress/nprogress.css";
import { NotionProvider } from "@/context/notion";

const playfair = Playfair_Display({ subsets: ["latin"] });

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", nProgress.start);
    router.events.on("routeChangeError", nProgress.done);
    router.events.on("routeChangeComplete", nProgress.done);
  }, [router]);

  const fontsClass = `${playfair.className}`;

  return (
    <NotionProvider>
      <Header className={fontsClass} />
      <main className={fontsClass}>
        <Component {...pageProps} />
      </main>
    </NotionProvider>
  );
}

export default App;
