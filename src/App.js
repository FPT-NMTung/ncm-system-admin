import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import RequireAuth from "./auth/RequireAuth";
import NoRequireAuth from "./auth/NoRequireAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <NoRequireAuth>
              <Login />
            </NoRequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <div>Dashboard</div>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
