import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextType } from "./@types/auth";
import { useAuthentication } from "./contexts/authContext";
import HomeProfile from "./modules/Home/HomeProfile";
import AboutYourPlace from "./modules/Host/AboutYourPlace";
import Location from "./modules/Host/Location";
import Structure from "./modules/Host/Structure";
import HomePage from "./pages/HomePage";
import HositingPage from "./pages/HositingPage";
import HomeLayout from "./pages/layout/Home/HomeLayout";
import HostLayout from "./pages/layout/Host/HostLayout";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { account } = useAuthentication() as AuthContextType;
  return (
    <Fragment>
      <Suspense>
        <Routes>
          {/* <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route> */}
          <Route path="/" element={<HomeLayout></HomeLayout>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            {account ? (
              <>
                <Route
                  path="profile"
                  element={<HomeProfile></HomeProfile>}
                ></Route>
                <Route
                  path="hosting/listings"
                  element={<HositingPage></HositingPage>}
                ></Route>
              </>
            ) : null}
          </Route>
          <Route
            path="/become-a-host/:room_id/"
            element={<HostLayout></HostLayout>}
          >
            {account ? (
              <>
                <Route
                  path="about-your-place"
                  element={<AboutYourPlace></AboutYourPlace>}
                ></Route>
                <Route
                  path="structure"
                  element={<Structure></Structure>}
                ></Route>
                 <Route
                  path="location"
                  element={<Location></Location>}
                ></Route>
              </>
            ) : null}
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
