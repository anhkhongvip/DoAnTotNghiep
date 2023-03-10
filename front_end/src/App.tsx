import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextType } from "./@types/auth";
import { useAuthentication } from "./contexts/authContext";
import HomeProfile from "./modules/Home/HomeProfile";
import HomePage from "./pages/HomePage";
import Layout from "./pages/layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { account } = useAuthentication() as AuthContextType;
  return (
    <Fragment>
      <Suspense>
        <Routes>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route path="/" element={<Layout></Layout>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            {account ? (
              <Route
                path="/profile"
                element={<HomeProfile></HomeProfile>}
              ></Route>
            ) : null}
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
