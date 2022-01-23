import ServerStyleSheets from "@sonnat/ui/styles/ServerStyleSheets";
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext
} from "next/document";
import * as React from "react";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta charSet="utf-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta property="robots" content="Index, Follow" />
          <meta name="google" content="notranslate" />
          <meta property="og:type" content="website" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="msapplication-TileColor" content="#2e294e" />
          <meta name="theme-color" content="#EE3F7C" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
