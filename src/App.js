import "./App.css";
import User from "./User";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <User />
      </PersistGate>
    </Provider>
  );
}

export default App;
