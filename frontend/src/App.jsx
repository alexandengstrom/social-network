import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DesignTemplate from "./components/DesignTemplate/DesignTemplate";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DesignTemplate />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Feed />} />
            <Route path="/user/:userId/" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
