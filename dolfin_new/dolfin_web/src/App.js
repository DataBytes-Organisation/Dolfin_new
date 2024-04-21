import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DolfinPage from "./pages/DolfinPage";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPages";
import QAPage from "./pages/QAPage";
import DashboardPage from "./pages/DashBoardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DolfinPage />} exact>
        <Route index element={<HomePage />} exact />
        <Route path="dash" element={<DashboardPage />} exact />
        <Route path="news" element={<NewsPage />} exact />
        <Route path="qa" element={<QAPage />} exact />
      </Route>
      <Route path="/login" element={<LoginPage />} exact />
      <Route path="/signup" element={<SignUpPage />} exact />
    </Routes>
  );
}

export default App;
