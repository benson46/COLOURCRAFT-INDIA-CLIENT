import { Route, Routes } from "react-router";
import "./index.css";
import AdminRouter from "./routers/AdminRouter";
import UserRouter from "./routers/UserRouter";

function App() {
  return (
    <div className="App overflow-x-hidden w-full">
        <Routes>
          <Route path="/admin/*" element={<AdminRouter />}></Route>
          <Route path="/*" element={<UserRouter />} />
        </Routes>
    </div>
  );
}

export default App;
