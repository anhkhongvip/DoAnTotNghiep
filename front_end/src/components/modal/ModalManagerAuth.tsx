import React, { Fragment } from "react";
import Login from "../../modules/Auth/Login";
import Register from "../../modules/Auth/Register";
import Modal from "./Modal";
type Props = {
  closeFn: (event: React.MouseEvent) => void;
  modal?: string;
};
const ModalManagerAuth = ({ closeFn = () => null, modal = "" }: Props) => {
  return (
    <Fragment>
      <Modal
        closeFn={closeFn}
        toggle={modal === "modal-login"}
        title="Đăng nhập"
      >
        <Login />
      </Modal>
      <Modal
        closeFn={closeFn}
        toggle={modal === "modal-register"}
        title="Đăng kí"
      >
        <Register />
      </Modal>
    </Fragment>
  );
};

export default ModalManagerAuth;
