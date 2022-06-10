import "../styles/globals.css";
import Storeprovider from "../store/confeeStore";

function MyApp({ Component, pageProps }) {
  return (
    <Storeprovider>
      <Component {...pageProps} />
    </Storeprovider>
  );
}

export default MyApp;
