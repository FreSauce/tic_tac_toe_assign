import { Outlet } from "react-router-dom";
import "./App.css";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}

export default App;
