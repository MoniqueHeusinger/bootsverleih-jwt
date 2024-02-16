import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import Bootsuebersicht from "./pages/Bootsuebersicht";
import Reservierungen from "./pages/Reservierungen";
import Header from "./components/Header";
import AddNewBootForm from "./pages/AddNewBootForm";
import AddReservierung from "./pages/addReservierung";
import BoatDetail from "./pages/BoatDetail";
import Register from "./pages/Register";
import { useState } from "react";
import Login from "./pages/Login";
import LoadingWrapper from "./components/LoadingWrapper";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  // neu: BasicAuth
  const [authorization, setAuthorization] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  return (
    <>
      <main>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/boatlist"
              element={
                <LoadingWrapper
                  authorization={authorization}
                  saveAuthorization={(auth) => setAuthorization(auth)}
                >
                  <Bootsuebersicht
                    authorization={authorization} // neu: BasicAuth
                    userProfileInfo={userProfileInfo} // neu: BasicAuth
                    onLogout={() => setAuthorization(null)} // neu für jwtAuth
                  />
                </LoadingWrapper>
              }
            />
            <Route
              path="/reservierungen"
              element={
                // <LoadingWrapper
                //   authorization={authorization}
                //   saveAuthorization={(auth) => setAuthorization(auth)}
                // >
                <Reservierungen />
                // </LoadingWrapper>
              }
            />
            <Route
              path="/add-boot"
              element={
                <LoadingWrapper
                  authorization={authorization}
                  saveAuthorization={(auth) => setAuthorization(auth)}
                >
                  <AddNewBootForm />
                </LoadingWrapper>
              }
            />
            <Route
              path="/add-reservierung/:bootId"
              element={
                <LoadingWrapper
                  authorization={authorization}
                  saveAuthorization={(auth) => setAuthorization(auth)}
                >
                  <AddReservierung />
                </LoadingWrapper>
              }
            />
            <Route path="/boat-detail/:bootId" element={<BoatDetail />} />

            <Route
              path="/login"
              element={
                <Login
                  onLoginSuccess={(authorization, userProfileInfo) => {
                    setAuthorization(authorization);
                    setUserProfileInfo(userProfileInfo);
                  }}
                />
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:userId" element={<VerifyEmail />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
