import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <CookiesProvider>
        <ModalsProvider>
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </ModalsProvider>
      </CookiesProvider>
    </MantineProvider>
  );
}

export default MyApp;
