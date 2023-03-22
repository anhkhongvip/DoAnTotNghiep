import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextType } from "./@types/auth";
import { useAuthentication } from "./contexts/authContext";
import HomeProfile from "./modules/Home/HomeProfile";
import StepPlan from "./modules/Host/StepPlan";
import FloorPlan from "./modules/Host/FloorPlan";
import Location from "./modules/Host/Location";
import Structure from "./modules/Host/Structure";
import HomePage from "./pages/HomePage";
import HositingPage from "./pages/HositingPage";
import HomeLayout from "./pages/layout/Home/HomeLayout";
import HostLayout from "./pages/layout/Host/HostLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Amenitie from "./modules/Host/Amenitie";
import Photo from "./modules/Host/Photo";

function App() {
  const { account } = useAuthentication() as AuthContextType;
  return (
    <Fragment>
      <Suspense>
        <Routes>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
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
                  element={
                    <StepPlan
                      step="1"
                      title="Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi"
                      description=" Trong bước này, chúng tôi sẽ hỏi xem bạn cho thuê loại chỗ ở nào
                  và bạn muốn cho khách đặt toàn bộ nhà hay chỉ một phòng cụ thể.
                  Sau đó, hãy cho chúng tôi biết vị trí và số lượng khách có thể ở
                  tại đó."
                    />
                  }
                ></Route>
                <Route
                  path="stand-out"
                  element={
                    <StepPlan
                      step="2"
                      title="Làm cho chỗ ở của bạn trở nên nổi bật"
                      description=" Ở bước này, bạn sẽ thêm một số tiện nghi được cung cấp tại chỗ ở của bạn, cùng với 5 bức ảnh trở lên. Sau đó, bạn sẽ soạn tiêu đề và nội dung mô tả."
                    />
                  }
                ></Route>
                <Route
                  path="structure"
                  element={<Structure></Structure>}
                ></Route>
                <Route path="location" element={<Location></Location>}></Route>
                <Route
                  path="floor-plan"
                  element={<FloorPlan></FloorPlan>}
                ></Route>
                <Route
                  path="amenities"
                  element={<Amenitie></Amenitie>}
                ></Route>
                <Route
                  path="photos"
                  element={<Photo></Photo>}
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
