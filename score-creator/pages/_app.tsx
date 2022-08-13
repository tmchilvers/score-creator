import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import "../styles/globals.css";
import "../styles/animations.css";

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
