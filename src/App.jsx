import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City";
import CountriesList from "./components/CountriesList";
import Form from "./components/Form";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate replace to="cities" />}></Route>

              <Route path="cities/:id" element={<City />} />
              {/* //nested router */}
              <Route path="cities" element={<CityList />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
