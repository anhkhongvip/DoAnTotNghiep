import { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputPasswordToggle = ({ ...props }: any) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  return (
    <Fragment>
      <Input
        name="password"
        id="password"
        placeholder="Nhập mật khẩu của bạn"
        type={togglePassword ? "text" : "password"}
        className="form-control"
        icon_position= "after"
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;