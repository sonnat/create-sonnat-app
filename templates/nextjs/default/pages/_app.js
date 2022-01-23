import CssBaseline from "@sonnat/ui/CssBaseline";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import SonnatInitializer from "@sonnat/ui/styles/SonnatInitializer";
import Head from "next/head";
import * as React from "react";
import theme from "../theme";

const googleFontFamily =
  "https://fonts.googleapis.com/css2?" +
  "family=Roboto+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&" +
  "family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&" +
  "display=swap";

const useGlobalStyles = makeStyles(
  {
    "@global": {
      "html, body": { scrollBehavior: "smooth" },
      img: { verticalAlign: "middle" }
    }
  },
  { name: "GlobalStyles" }
);

export default function App(props) {
  // eslint-disable-next-line react/prop-types
  const { Component: Page, pageProps } = props;

  useGlobalStyles();

  React.useEffect(() => {
    const sonnatServerStyles = document.getElementById("sonnat-jss-ssr");

    if (sonnatServerStyles)
      sonnatServerStyles.parentElement.removeChild(sonnatServerStyles);
  }, []);

  return (
    <SonnatInitializer theme={theme}>
      <Head>
        <title>Sonnat App</title>
        <meta name="application-name" content="Sonnat App" />
        <meta name="apple-mobile-web-app-title" content="Sonnat App" />
        <meta property="og:site_name" content="Sonnat App" />
        <meta
          name="description"
          content="Web site created using create-sonnat-app"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=5.0, minimum-scale=1.0"
          key="viewport"
        />
        <link rel="preload" as="style" href={googleFontFamily} />
        <link rel="stylesheet" href={googleFontFamily} />
      </Head>
      <div id="main-wrapper">
        <CssBaseline />
        <Page {...pageProps} />
      </div>
    </SonnatInitializer>
  );
}
