import { Playfair_Display } from "next/font/google";
import "@/styles/globals.scss";

const font = Playfair_Display({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
