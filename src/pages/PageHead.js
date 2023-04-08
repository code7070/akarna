import Head from "next/head";

// DEFAULT CONFIG
const defaultTitle = "Akarnas";
const defaultIcon = "/favicon.ico";
const defaultDesc = "Your wedding solution partner";

export default function PageHead({
  title = defaultTitle,
  icon = defaultIcon,
  desc = defaultDesc,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="icon" href={icon} />
    </Head>
  );
}
