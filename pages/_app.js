import "../styles/globals.css";
import "antd/dist/antd.css";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "../src/context/user";
import { PlayProvider } from "../src/context/play";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <PlayProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </PlayProvider>
    </UserProvider>
  );
}

export default MyApp;
