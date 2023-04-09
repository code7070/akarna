import { Playfair_Display } from "next/font/google";
import "@/styles/globals.scss";
import { wrapper } from "@/store";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import Header from "@/components/header";
// import "nprogress/"

const font = Playfair_Display({ subsets: ["latin"] });

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", nProgress.start);
    router.events.on("routeChangeError", nProgress.done);
    router.events.on("routeChangeComplete", nProgress.done);
  }, [router]);

  return (
    <>
      <Header className={font.className} />
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default wrapper.withRedux(App);
