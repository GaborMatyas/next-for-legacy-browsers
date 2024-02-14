import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initializeCoralogixRUM } from "../helpers/initialize-coralogix-rum";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeCoralogixRUM()
  }, [])
  return <Component {...pageProps} />;
}
