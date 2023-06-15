import { Provider } from "react-redux";
import Routing from "./Component/Common/Routing";
import Store from "./Redux/Store/Store";

function App() {
  return (
    <>
      <Provider store={Store}>
        <Routing />
      </Provider>
    </>
  );
}

export default App;
