import "./App.css";
import User from "./User";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <User />
    </Provider>
  );
}

export default App;
