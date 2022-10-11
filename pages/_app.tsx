import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MetaMaskProvider } from "metamask-react";
import { defaultDarkTheme } from "../utils/theme";
import { ThemeProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultDarkTheme}>
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>
    </ThemeProvider>
  );
}

export default MyApp;
