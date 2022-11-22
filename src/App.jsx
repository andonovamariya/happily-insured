import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Profile from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import Insurances from "./pages/Insurances";
import InsuranceDetails from "./pages/Insurances/InsuranceDetails";
import CarInsurance from "./pages/Insurances/CarInsurance";

const App = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {authCtx.isLoggedIn && (
          <Route
            path="/insurances/:insuranceId"
            element={<InsuranceDetails />}
          />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/insurances" element={<Insurances />} />
        )}
        {authCtx.isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {authCtx.isLoggedIn && (
          <Route
            path="/insurances/getCarInsuranceQuote"
            element={<CarInsurance />}
          />
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
