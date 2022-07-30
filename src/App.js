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
import Contact from "./screens/Contact/Contact";
import RequestChangeOwnerContact from "./screens/RequestChangeOwnerContact/RequestChangeOwnerContact";
import Test from "./screens/Test/Test";
import AddUser from "./screens/AddUser/AddUser";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<NoRequireAuth><Login title="Login | Administrator"/></NoRequireAuth>}/>
      <Route path="/" element={<RequireAuth><MainLayout/></RequireAuth>}>
        <Route index element={<Dashboard title="Dashboard | Administrator"/>}/>
        <Route path="/user">
          <Route index element={<User title="Manager User | Administrator"/>}/>
          <Route path="/user/:id" element={<UserDetail title="User Detail | Administrator"/>}/>
          <Route path="/user/add" element={<AddUser title="Add User | Administrator"/>}/>        
        </Route>
        <Route path="/manage-contact" element={<Contact title="Manager Contact | Administrator"/>}/>
        <Route path="/import-user" element={<ImportUser title="Import User | Administrator"/>}/>
      </Route>
      <Route path="/test" element={<Test title="test"/>}/>
      <Route path="/request-change-owner-contact/:id/:code" element={<RequestChangeOwnerContact title="Request Change Owner Contact"/>}/>
      <Route path="/404" element={<NotFound title="404 - Page not found"/>}/>
      <Route path="*" element={<NotFound title="404 - Page not found"/>}/>
    </Routes> 
  );
}

export default App;
