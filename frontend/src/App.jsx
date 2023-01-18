import { Outlet } from "react-router-dom";
import "./App.css";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Outlet />
      </UserContextProvider>
    </div>
  );
}

export default App;
