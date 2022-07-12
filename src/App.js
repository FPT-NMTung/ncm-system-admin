import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import RequireAuth from "./auth/RequireAuth";
import NoRequireAuth from "./auth/NoRequireAuth";
import MainLayout from "./components/MainLayout/MainLayout";
import Dashboard from "./screens/Dashboard/Dashboard";
import NotFound from "./screens/NotFound/NotFound";
import User from "./screens/User/User";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<NoRequireAuth><Login/></NoRequireAuth>}/>
        <Route path="/" element={<RequireAuth><MainLayout/></RequireAuth>}>
          <Route index element={<Dashboard/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/manage-contact" element={<div>manage-contact</div>}/>
        </Route>
        <Route path="/404" element={<NotFound/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
