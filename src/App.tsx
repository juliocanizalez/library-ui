import { Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";

import IndexPage from "@/pages/index";
import CheckoutsPage from "@/pages/checkouts";
import LoginPage from "@/pages/login";
import ProtectedRoute from "@/components/common/protected-route";
import store from "@/store";
import { loadTokenFromStorage } from "@/store/auth-slice";

const AppContent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <IndexPage />
          </ProtectedRoute>
        }
        path="/"
      />
      <Route
        element={
          <ProtectedRoute allowedRoles={["librarian"]}>
            <CheckoutsPage />
          </ProtectedRoute>
        }
        path="/checkouts"
      />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
