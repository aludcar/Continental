import App from "./App";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";

const containerRoot = document.querySelector("#render-react")

containerRoot && ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  containerRoot
);
