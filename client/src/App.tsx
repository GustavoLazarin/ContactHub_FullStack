import { ToastContainer } from "react-toastify";
import { RoutesMain } from "./routes/RoutesMain";
import "./styles/index.scss"

export const App = () => {
  return (
    <div className="App">
      <RoutesMain />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
