import { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

type Props = {
  children?: React.ReactNode;
  type?: string;
  name: string;
  id?: string;
  className?: string;
  placeholder?: string;
  icon_position?: string;
  disabled?: boolean;
};
const InputIcon = ({ children, ...props }: Props) => {
  return (
    <Fragment>
      <Input {...props}>{children}</Input>
    </Fragment>
  );
};

export default InputIcon;
