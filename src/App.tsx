import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CheckoutsPage from "@/pages/checkouts";
import LoginPage from "@/pages/login";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CheckoutsPage />} path="/checkouts" />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
}

export default App;
