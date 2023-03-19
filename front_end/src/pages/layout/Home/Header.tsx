import React, {
  createRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ModalManagerAuth from "../../../components/modal/ModalManagerAuth";
import useClickOutside from "../../../hooks/useClickOutside";
import { DropdownMenu } from "../../../components/dropdown";
import { useModal } from "../../../contexts/modalContext";
import { ModalContextType } from "../../../@types/modal";
import { AuthContextType } from "../../../@types/auth";
import useAuth from "../../../hooks/useAuth";
import useResize from "../../../hooks/useResize";
import { useAuthentication } from "../../../contexts/authContext";
import { getAccountAsync } from "../../../services/account.service";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  removeAccount,
  selectAccount,
} from "../../../features/account/accountSlice";
const HeaderStyles = styled.header`
  .navbar {
    max-width: 1440px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1.5rem;
    &-brand {
      display: flex;
      align-items: center;
      &__title {
        margin-left: 1rem;
        font-weight: bold;
      }
    }
    &-logo {
      width: 4rem;
      height: 3.8rem;
    }

    &-nav {
      display: flex;
      align-items: center;
    }
    &-notification {
      position: relative;
      cursor: pointer;
      .bubble-count {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -30%);
        width: 1.5rem;
        height: 1.5rem;
        background-color: #eb5757;
        border-radius: 1.5rem;
        font-size: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }

    .profile {
      &-avatar {
        overflow: hidden;
        margin-left: 5rem;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 3.2rem;
        cursor: pointer;
      }
      &-info {
        &__name {
          margin: 0 1rem;
        }
      }
    }

    &-auth {
      .btn-auth {
        padding: 0 1.2rem;
        &:hover {
          transition: 0.4s;
          color: #5a89ff;
        }
      }
    }
  }
`;

const Header = () => {
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  useClickOutside(nodeRef, () => setShowDropdownMenu(false));
  const [coords, setCoords] = useResize(nodeRef);
  const { modalOpen, setModalOpen } = useModal() as ModalContextType;
  const [token, setToken] = useState<string>(localStorage.getItem("token")!);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accountSelector = useAppSelector(selectAccount);

  useEffect(() => {
    async function fetchUser() {
      if (token === "") {
        dispatch(removeAccount());
      } else {
        await dispatch(getAccountAsync(token));
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const openModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const {
      dataset: { modal },
    } = target;
    if (modal) {
      setModalOpen(modal);
    }
  };
  const closeModal = (event: React.MouseEvent<Element, MouseEvent>): void => {
    event.stopPropagation();
    setModalOpen("");
  };
  const handleClickDropDown = () => {
    setCoords(nodeRef?.current?.getBoundingClientRect());
    setShowDropdownMenu(!showDropdownMenu);
  };

  const handleLogout = () => {
    dispatch(removeAccount());
    setToken("");
    localStorage.setItem("token", "");
    navigate("/");
  };

  return (
    <HeaderStyles>
      <nav className="navbar" onClick={openModal}>
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <img src="/logo-main.png" alt="" />
          </div>
          <h3 className="navbar-brand__title">TripGuide</h3>
        </Link>
        <div className="navbar-nav">
          {accountSelector.account ? (
            <>
              <div className="navbar-notification">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.9981 15.0004H3.99802V8.50017C3.99802 6.00007 5.99803 4 8.49805 4C10.9981 4 12.9981 6.00007 12.9981 8.50017V15.0004ZM15 14.0005V8.50031C15 5.4302 12.86 2.86011 10 2.18008V1.50006C10 0.671598 9.32843 0 8.5 0C7.67157 0 7 0.671598 7 1.50006V2.18008C4.13 2.86011 2 5.4302 2 8.50031V14.0005L0 16.0006V17.0006H17V16.0006L15 14.0005ZM8.49994 20.0001C9.6045 20.0001 10.4999 19.1046 10.4999 18H6.49996C6.49996 19.1046 7.39538 20.0001 8.49994 20.0001Z"
                    fill="#84878B"
                  />
                </svg>
                <span className="bubble-count">1</span>
              </div>
              <div
                className="navbar-dropdown cursor-pointer"
                onClick={handleClickDropDown}
                ref={nodeRef}
              >
                <div className="navbar-profile flex items-center">
                  <div className="profile-avatar">
                    <img
                      src={accountSelector.account?.avatar}
                      alt="img-avatar"
                    />
                  </div>
                  <div className="profile-info flex items-center">
                    <h3 className="profile-info__name">
                      {accountSelector.account?.username}
                    </h3>
                    <div className="profile-tool">
                      <i className="fa-solid fa-caret-down"></i>
                    </div>
                  </div>
                </div>
                <DropdownMenu
                  coords={coords as DOMRect}
                  show={showDropdownMenu}
                >
                  <Link
                    to="/profile"
                    className="dropdownMenu-item cursor-pointer flex items-center"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.01776 0.493164C6.45974 0.496118 4.9362 0.951083 3.63272 1.80264C2.32924 2.6542 1.30207 3.8656 0.676338 5.28929C0.050602 6.71298 -0.146697 8.2875 0.108472 9.82108C0.363641 11.3547 1.06026 12.7811 2.11349 13.9267C2.86572 14.7403 3.77869 15.3896 4.79486 15.8337C5.81104 16.2778 6.90839 16.507 8.01776 16.507C9.12714 16.507 10.2245 16.2778 11.2407 15.8337C12.2568 15.3896 13.1698 14.7403 13.922 13.9267C14.9753 12.7811 15.6719 11.3547 15.9271 9.82108C16.1822 8.2875 15.9849 6.71298 15.3592 5.28929C14.7335 3.8656 13.7063 2.6542 12.4028 1.80264C11.0993 0.951083 9.57578 0.496118 8.01776 0.493164ZM8.01776 14.9206C6.35369 14.918 4.75548 14.2716 3.55944 13.1171C3.92256 12.2351 4.54029 11.4807 5.33413 10.9497C6.12797 10.4188 7.06208 10.1353 8.01776 10.1353C8.97344 10.1353 9.90755 10.4188 10.7014 10.9497C11.4952 11.4807 12.113 12.2351 12.4761 13.1171C11.28 14.2716 9.68183 14.918 8.01776 14.9206ZM6.41116 6.90534C6.41116 6.58829 6.50538 6.27836 6.68192 6.01474C6.85846 5.75112 7.10937 5.54565 7.40294 5.42432C7.69651 5.30299 8.01954 5.27125 8.33119 5.3331C8.64285 5.39495 8.92912 5.54763 9.1538 5.77182C9.37849 5.99601 9.5315 6.28164 9.5935 6.59261C9.65549 6.90357 9.62367 7.22588 9.50207 7.5188C9.38047 7.81172 9.17455 8.06208 8.91034 8.23823C8.64614 8.41437 8.33552 8.50839 8.01776 8.50839C7.59166 8.50839 7.18302 8.3395 6.88172 8.03887C6.58043 7.73824 6.41116 7.3305 6.41116 6.90534ZM13.5686 11.7145C12.8509 10.4896 11.7462 9.53676 10.4277 9.00533C10.8367 8.54258 11.1032 7.9719 11.1952 7.36176C11.2872 6.75162 11.2008 6.12796 10.9464 5.5656C10.692 5.00324 10.2803 4.52607 9.76085 4.19136C9.24138 3.85665 8.63614 3.67861 8.01776 3.67861C7.39939 3.67861 6.79415 3.85665 6.27467 4.19136C5.75519 4.52607 5.34355 5.00324 5.08912 5.5656C4.8347 6.12796 4.74831 6.75162 4.84032 7.36176C4.93234 7.9719 5.19884 8.54258 5.60786 9.00533C4.28932 9.53676 3.18467 10.4896 2.46695 11.7145C1.89495 10.7423 1.59273 9.6357 1.59135 8.50839C1.59135 6.80777 2.26841 5.17681 3.4736 3.97429C4.67879 2.77178 6.31337 2.09621 8.01776 2.09621C9.72215 2.09621 11.3567 2.77178 12.5619 3.97429C13.7671 5.17681 14.4442 6.80777 14.4442 8.50839C14.4428 9.6357 14.1406 10.7423 13.5686 11.7145Z"
                        fill="#777E90"
                      />
                    </svg>
                    My Profile
                  </Link>
                  <Link
                    to="/hello"
                    className="dropdownMenu-item cursor-pointer flex items-center"
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9876 9.06746C11.777 8.45074 12.3532 7.60504 12.636 6.64801C12.9188 5.69097 12.8942 4.6702 12.5656 3.72771C12.237 2.78521 11.6207 1.96786 10.8024 1.38937C9.98423 0.810873 9.00478 0.5 8.00035 0.5C6.99592 0.5 6.01646 0.810873 5.19824 1.38937C4.38003 1.96786 3.76374 2.78521 3.43512 3.72771C3.10649 4.6702 3.08188 5.69097 3.3647 6.64801C3.64752 7.60504 4.22371 8.45074 5.01311 9.06746C3.66046 9.60558 2.48023 10.4981 1.59823 11.6499C0.716236 12.8017 0.165542 14.1696 0.00485675 15.6077C-0.00677448 15.7127 0.00253503 15.8189 0.0322535 15.9204C0.061972 16.0218 0.111518 16.1164 0.178061 16.1988C0.312453 16.3652 0.507923 16.4718 0.721472 16.4952C0.93502 16.5185 1.14915 16.4566 1.31677 16.3232C1.48438 16.1897 1.59174 15.9956 1.61523 15.7836C1.79203 14.2206 2.54255 12.7772 3.72338 11.729C4.90421 10.6807 6.43257 10.1013 8.01645 10.1013C9.60033 10.1013 11.1287 10.6807 12.3095 11.729C13.4904 12.7772 14.2409 14.2206 14.4177 15.7836C14.4396 15.98 14.534 16.1615 14.6827 16.2929C14.8314 16.4243 15.0238 16.4964 15.2229 16.4952H15.3114C15.5225 16.4711 15.7154 16.3651 15.8481 16.2003C15.9809 16.0356 16.0426 15.8254 16.02 15.6157C15.8585 14.1735 15.3049 12.8021 14.4184 11.6485C13.5318 10.495 12.3459 9.60273 10.9876 9.06746ZM8.00035 8.49978C7.36334 8.49978 6.74065 8.31222 6.211 7.9608C5.68135 7.60938 5.26854 7.1099 5.02477 6.52551C4.781 5.94112 4.71722 5.29808 4.84149 4.6777C4.96576 4.05732 5.27251 3.48746 5.72294 3.04019C6.17337 2.59292 6.74725 2.28833 7.37201 2.16492C7.99677 2.04152 8.64436 2.10486 9.23287 2.34692C9.82138 2.58898 10.3244 2.99889 10.6783 3.52483C11.0322 4.05076 11.2211 4.66909 11.2211 5.30163C11.2211 6.14983 10.8818 6.9633 10.2778 7.56307C9.67375 8.16284 8.85454 8.49978 8.00035 8.49978Z"
                        fill="#777E90"
                      />
                    </svg>
                    Manage account
                  </Link>
                  <Link
                    to="/"
                    className="dropdownMenu-item cursor-pointer flex items-center"
                  >
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.65625 3.83211H4.32315V11.8321H11.6445V3.83211H11.3111H4.65625ZM12.9755 3.83211V11.8321H13.3093C13.6768 11.8321 13.9748 11.5336 13.9748 11.1654V4.49878C13.9748 4.13059 13.6768 3.83211 13.3093 3.83211H12.9755ZM2.66158 3.83211H2.99219V11.8321H2.66158C2.29404 11.8321 1.99609 11.5336 1.99609 11.1654V4.49878C1.99609 4.13059 2.29404 3.83211 2.66158 3.83211ZM11.3111 2.50008H13.3082C14.4108 2.50008 15.3047 3.39551 15.3047 4.50008V11.1667C15.3047 12.2713 14.4108 13.1667 13.3082 13.1667H2.66051C1.5579 13.1667 0.664062 12.2713 0.664062 11.1667V4.50008C0.664062 3.39551 1.5579 2.50008 2.66051 2.50008H4.65625V2.49878C4.65625 1.39421 5.55009 0.498779 6.65269 0.498779H9.31462C10.4172 0.498779 11.3111 1.39421 11.3111 2.49878V2.50008ZM9.97726 2.50008C9.97726 2.13189 9.67932 1.83341 9.31178 1.83341H6.64986C6.28232 1.83341 5.98438 2.13189 5.98438 2.50008H9.97726Z"
                        fill="#777E90"
                      />
                    </svg>
                    Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdownMenu-item cursor-pointer flex items-center"
                  >
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.36102 8.98109L2.72159 8.32742L6.39032 8.32742C6.6023 8.32742 6.8056 8.24025 6.9555 8.08508C7.1054 7.9299 7.18961 7.71945 7.18961 7.5C7.18961 7.28055 7.1054 7.0701 6.9555 6.91492C6.8056 6.75975 6.6023 6.67258 6.39032 6.67258L2.72159 6.67258L3.36102 6.01891C3.43593 5.94199 3.4954 5.85048 3.53597 5.74965C3.57655 5.64882 3.59744 5.54067 3.59744 5.43144C3.59744 5.32221 3.57655 5.21406 3.53597 5.11324C3.4954 5.01241 3.43593 4.92089 3.36102 4.84397C3.28671 4.76642 3.19831 4.70486 3.10091 4.66286C3.00351 4.62085 2.89904 4.59922 2.79352 4.59922C2.68801 4.59922 2.58354 4.62085 2.48613 4.66286C2.38873 4.70486 2.30033 4.76642 2.22603 4.84397L0.227808 6.91253C0.15504 6.99122 0.0979987 7.08401 0.0599571 7.18558C-0.0199861 7.38702 -0.0199861 7.61298 0.0599571 7.81442C0.0979987 7.91599 0.15504 8.00878 0.227808 8.08747L2.22603 10.156C2.37654 10.3118 2.58067 10.3994 2.79352 10.3994C3.00637 10.3994 3.21051 10.3118 3.36102 10.156C3.51153 10.0002 3.59608 9.7889 3.59608 9.56856C3.59608 9.34821 3.51153 9.13689 3.36102 8.98109ZM4.44006 2.53546C4.36448 2.6137 4.30453 2.70658 4.26363 2.80879C4.22273 2.91101 4.20168 3.02057 4.20168 3.13121C4.20168 3.24185 4.22273 3.3514 4.26363 3.45362C4.30453 3.55584 4.36448 3.64872 4.44006 3.72695C4.51563 3.80519 4.60535 3.86724 4.70409 3.90958C4.80283 3.95192 4.90866 3.97372 5.01554 3.97372C5.12242 3.97372 5.22825 3.95192 5.32699 3.90958C5.42574 3.86724 5.51546 3.80519 5.59103 3.72695C6.31195 2.98038 7.23055 2.4719 8.23066 2.26581C9.23076 2.05973 10.2674 2.1653 11.2096 2.56918C12.1517 2.97306 12.957 3.6571 13.5236 4.53479C14.0901 5.41247 14.3925 6.44438 14.3925 7.5C14.3925 8.55562 14.0901 9.58753 13.5236 10.4652C12.957 11.3429 12.1517 12.0269 11.2096 12.4308C10.2674 12.8347 9.23076 12.9403 8.23066 12.7342C7.23055 12.5281 6.31195 12.0196 5.59103 11.273C5.51546 11.1948 5.42574 11.1328 5.327 11.0904C5.22825 11.0481 5.12242 11.0263 5.01554 11.0263C4.90867 11.0263 4.80283 11.0481 4.70409 11.0904C4.60535 11.1328 4.51563 11.1948 4.44006 11.273C4.36448 11.3513 4.30453 11.4442 4.26363 11.5464C4.22273 11.6486 4.20168 11.7582 4.20168 11.8688C4.20168 11.9794 4.22273 12.089 4.26363 12.1912C4.30453 12.2934 4.36448 12.3863 4.44006 12.4645C5.38734 13.4393 6.59227 14.1018 7.90286 14.3685C9.21344 14.6352 10.571 14.4942 11.8042 13.9631C13.0374 13.4321 14.0911 12.5349 14.8324 11.3846C15.5736 10.2344 15.9691 8.88268 15.9691 7.5C15.9691 6.11731 15.5736 4.7656 14.8324 3.61536C14.0911 2.46513 13.0374 1.5679 11.8042 1.03686C10.571 0.505822 9.21344 0.364755 7.90286 0.631459C6.59227 0.898163 5.38734 1.56069 4.44006 2.53546Z"
                        fill="#777E90"
                      />
                    </svg>
                    Log out
                  </button>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="navbar-auth flex items-center">
              <button
                type="button"
                data-modal="modal-register"
                className="btn btn-auth"
              >
                Đăng ký
              </button>
              <button
                type="button"
                data-modal="modal-login"
                className="btn btn-auth"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </nav>
      <ModalManagerAuth
        closeFn={(event) => closeModal(event)}
        modal={modalOpen}
      ></ModalManagerAuth>
    </HeaderStyles>
  );
};

export default Header;
