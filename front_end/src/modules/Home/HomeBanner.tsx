import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useFormik, Form, Field, ErrorMessage, Formik, useField } from "formik";
import * as Yup from "yup";
import Calendar from "../../components/calendar/Calendar";
import { format, addDays } from "date-fns";
interface FormSearch {
  searchLocation: string;
}

const initialValues: FormSearch = {
  searchLocation: "",
};
const HomeBannerStyles = styled.div`
  .home_banner {
    width: 100%;
    min-height: 732px;
    background-size: cover;
    position: relative;
    z-index: 99;
    .image-cover {
      min-height: 655px;
      background-size: cover;
      background-position: center;
      background-image: url("https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    }
    .search-bar {
      width: 1290px;
      box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
      height: 205px;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 50%;
      border-radius: 2rem;
      transform: translate(-50%);
      padding: 3rem 3rem;
      font-weight: bold;
      .category-item {
        display: inline-block;
        position: relative;
        margin-right: 5rem;
        padding-bottom: 2rem;
        &.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #316bff;
          height: 0.2rem;
        }
        .icon-category {
          font-size: 2.2rem;
          margin-right: 1rem;
        }
      }

      &__form {
        display: flex;
        .select-box-search {
          width: 100%;
          border: 1px solid #c1c8d3;
          border-radius: 0.5rem;
        }
        .submitSearch {
          margin-left: 2rem;
          padding: 0.5rem 5rem;
          border-radius: 0.8rem;
          background-color: #e74432;
          color: white;
          font-size: 2rem;
          display: inline-block;
        }
      }
    }
    .calendar_check_in_out {
      margin-left: 2rem;
      position: relative;
      height: 5rem;
      border: 1px solid #c1c8d3;
      border-radius: 0.5rem;
      padding-right: 6.5rem;
      & label {
        font-size: 1.3rem;
      }
      & .date-icon {
        width: 7rem;
        text-align: center;
        font-size: 2rem;
      }
      & .calendar-range {
        background-color: white;
        position: absolute;
        z-index: 99;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .icon_input {
      width: 6.5rem;
      height: 5rem;
      border-radius: 10px;
      text-align: center;
    }

    .icon_input i {
      font-size: 2rem;
      line-height: 5rem;
    }
  }
`;

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const HomeBanner = () => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<[Range]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  return (
    <HomeBannerStyles>
      <div className="home_banner">
        <div className="image-cover"></div>
        <div className="search-bar">
          <div className="search-bar__header">
            <ul className="category-search flex">
              <li className="category-item active">
                <button className="btn btn-category-tab ">
                  <i className="fa-solid fa-house icon-category"></i> C??n h???
                </button>
              </li>
              <li className="category-item">
                <button className="btn btn-category-tab">
                  <i className="fa-solid fa-dungeon icon-category"></i> Bi???t th???
                  & HomeStay
                </button>
              </li>
              <li className="category-item">
                <button className="btn btn-category-tab">
                  <i className="fa-solid fa-building icon-category"></i> Kh??ch
                  s???n
                </button>
              </li>
              <li className="category-item">
                <button className="btn btn-category-tab">
                  <i className="fa-solid fa-suitcase icon-category"></i> Tour
                </button>
              </li>
            </ul>
          </div>
          <div className="search-bar__content mt-10">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
              }}
            >
              <Form className="search-bar__form">
                <div className="form-group">
                  <MyInputSearch
                    className="text-search"
                    id="searchLocation"
                    name="searchLocation"
                    placeholder="B???n mu???n ??i ????u?"
                  />
                </div>
                <div className="pills-home-flex-2 flex">
                  <div className="form-group pills-home pills-home-flex-2-1">
                    <div
                      onClick={() => setOpenDate(!openDate)}
                      className="calendar_check_in_out flex mr-10"
                    >
                      <div className="date-checkinout flex items-center mr-10">
                        <div className="date-icon">
                          <i className="fa-solid fa-calendar-days"></i>
                        </div>
                        <div className="date-content">
                          <label htmlFor="check-in">Ng??y ?????n</label>
                          <div className="date-info">
                            {format(date[0].startDate, "dd/MM/yyyy")}
                          </div>
                        </div>
                      </div>
                      <div className="date-checkinout flex items-center">
                        <div className="date-icon">
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                        <div className="date-content">
                          <label htmlFor="check-in">Ng??y ??i</label>
                          <div className="date-info">
                            {format(date[0].endDate, "dd/MM/yyyy")}
                          </div>
                        </div>
                      </div>
                      {openDate ? (
                        <div className="calendar-range">
                          <Calendar date={date} setDate={setDate}></Calendar>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-group pills-home pills-home-flex-2-2">
                    <div className="select-box-search flex items-center cursor-pointer">
                      <div className="icon_input">
                      <i className="fa-solid fa-people-group"></i>
                      </div>
                      <MySelectbox name="job" id="job">
                        <option value="doctor">1 ph??ng, 1 ng?????i</option>
                        <option value="teacher">??i c???p ????i 2 ng?????i</option>
                        <option value="dentist">??i theo gia ????nh</option>
                      </MySelectbox>
                    </div>
                  </div>
                </div>

                <button  className="submitSearch" type="submit">T??m</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};
type Props = {
  className: string;
  name: string;
  id: string;
  placeholder: string;
};
const MyInputSearchStyles = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
  border: 1px solid #c1c8d3;

  .text-search {
    width: 90%;
    padding-right: 1.5rem;
    font-size: 1.6rem;
  }
`;
const MyInputSearch = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <MyInputSearchStyles>
      <div className="icon_input">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input type="text" {...field} {...props} />
    </MyInputSearchStyles>
  );
};

const MySelectbox = (props: any) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <div className="flex flex-col gap-2 w-full pr-4 ">
        <select className="cursor-pointer"
          {...field}
          {...props}
        />
      </div>
    </Fragment>
  );
};

export default HomeBanner;
