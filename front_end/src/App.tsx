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
import Title from "./modules/Host/Title";
import Description from "./modules/Host/Description";
import Price from "./modules/Host/Price";
import Receipt from "./modules/Host/Receipt";
import Overview from "./modules/Host/Overview";

function App() {
  const { account } = useAuthentication() as AuthContextType;
  return (
    <Fragment>
      <Suspense>
        <Routes>
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
                path=""
                element={<Overview step={1}></Overview>}
              ></Route>
                <Route
                  path="about-your-place"
                  element={
                    <StepPlan
                      src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
                      step={1}
                      stepTitle={1}
                      title="Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi"
                      description=" Trong bước này, chúng tôi sẽ hỏi xem bạn cho thuê loại chỗ ở nào
                  và bạn muốn cho khách đặt toàn bộ nhà hay chỉ một phòng cụ thể.
                  Sau đó, hãy cho chúng tôi biết vị trí và số lượng khách có thể ở
                  tại đó."
                    />
                  }
                ></Route>
                <Route
                  path="structure"
                  element={<Structure step={2}></Structure>}
                ></Route>
                <Route
                  path="location"
                  element={<Location step={3}></Location>}
                ></Route>
                <Route
                  path="floor-plan"
                  element={<FloorPlan step={4}></FloorPlan>}
                ></Route>
                <Route
                  path="stand-out"
                  element={
                    <StepPlan
                      src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
                      step={5}
                      stepTitle={2}
                      title="Làm cho chỗ ở của bạn trở nên nổi bật"
                      description=" Ở bước này, bạn sẽ thêm một số tiện nghi được cung cấp tại chỗ ở của bạn, cùng với 5 bức ảnh trở lên. Sau đó, bạn sẽ soạn tiêu đề và nội dung mô tả."
                    />
                  }
                ></Route>
                <Route
                  path="amenities"
                  element={<Amenitie step={6}></Amenitie>}
                ></Route>
                <Route path="photos" element={<Photo step={7}></Photo>}></Route>
                <Route path="title" element={<Title step={8}></Title>}></Route>
                <Route
                  path="description"
                  element={<Description step={9}></Description>}
                ></Route>
                <Route
                  path="finish-setup"
                  element={
                    <StepPlan
                      src="https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high"
                      step={10}
                      stepTitle={3}
                      title="Hoàn thiện và đăng"
                      description=" Cuối cùng, bạn sẽ chọn bắt đầu với việc đón tiếp khách có kinh nghiệm hoặc không, sau đó bạn sẽ đặt giá theo đêm. Hãy trả lời một vài câu hỏi nhanh và đăng mục cho thuê khi bạn đã sẵn sàng."
                    />
                  }
                ></Route>
                <Route path="price" element={<Price step={11}></Price>}></Route>
                <Route
                  path="receipt"
                  element={<Receipt step={12}></Receipt>}
                ></Route>
              </>
            ) : null}
          </Route>
          <Route path="/notfound" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
