import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import RequireAuth from "./auth/RequireAuth";
import NoRequireAuth from "./auth/NoRequireAuth";
import MainLayout from "./components/MainLayout/MainLayout";
import Dashboard from "./screens/Dashboard/Dashboard";
import NotFound from "./screens/NotFound/NotFound";
import User from "./screens/User/User";
import UserDetail from "./screens/UserDetail/UserDetail";
import ImportUser from "./screens/ImportUser/ImportUser";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<NoRequireAuth><Login/></NoRequireAuth>}/>
      <Route path="/" element={<RequireAuth><MainLayout/></RequireAuth>}>
        <Route index element={<Dashboard/>}/>
        <Route path="/user">
          <Route index element={<User/>}/>
          <Route path="/user/:id" element={<UserDetail/>}/>
          <Route path="/user/import-user" element={<ImportUser/>}/>
        </Route>
        <Route path="/manage-contact" element={<div>manage-contact</div>}/>
      </Route>
      <Route path="/404" element={<NotFound/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
