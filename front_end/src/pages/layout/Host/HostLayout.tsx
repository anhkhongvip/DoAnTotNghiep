import React, { Fragment, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import { useAppDispatch } from "../../../app/hooks";
import { createRoomAsync } from "../../../services/room.service";
const HostLayoutStyles = styled.div`
  .header {
    position: sticky;
    z-index: 10;
    top: 0;
    left: 0;
  }

  .main {
    height: auto;
    margin-bottom: 12rem;
  }

  .footer {
    position: fixed;
    width: 100%;
    z-index: 10;
    bottom: 0;
    left: 0;
  }
`;

type ContextType = {
  setData: (data: any) => void;
  data: any;
};

const HostLayout = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState({
    loadingBack: false,
    loadingNext: false,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function wait(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  const handleNext = async () => {
    const { nextPage, backPage, ...restData } = data;
    let newNextPage = nextPage;
    setLoading({ ...loading, loadingNext: true });
    await wait(1000);
    setLoading({ ...loading, loadingNext: false });
    if (nextPage === "begin") {
      try {
        let res: any = await dispatch(createRoomAsync({}));
        if (res.payload.data.status === "success") {
          const { id } = res.payload.data.results;
          newNextPage = `/become-a-host/${id}/about-your-place`;
        }
      } catch (err) {
        console.log(err);
      }
    } else if (nextPage === "end") {
      newNextPage = "/hosting/listings";
    } else {
    }
    navigate(newNextPage);
  };
  const handleBack = async () => {
    const { backPage } = data;
    setLoading({ ...loading, loadingBack: true });
    await wait(1000);
    setLoading({ ...loading, loadingBack: false });
    navigate(backPage);
  };
  return (
    <HostLayoutStyles>
      <Fragment>
        <header className="header">
          <Header></Header>
        </header>
        <main className="main">
          <Outlet context={{ data, setData }}></Outlet>
        </main>
        <footer className="footer">
          <Footer
            handleNext={handleNext}
            handleBack={handleBack}
            nextPage={data?.nextPage}
            backPage={data?.backPage}
            loadingNext={loading.loadingNext}
            loadingBack={loading.loadingBack}
          ></Footer>
        </footer>
      </Fragment>
    </HostLayoutStyles>
  );
};

export default HostLayout;

export function useData() {
  return useOutletContext<ContextType>();
}
