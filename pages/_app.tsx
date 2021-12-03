import "../styles/globals.css";
// import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (

      <Component {...pageProps} />

  );
};



export default MyApp;
