// import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
interface PasswordFieldProp {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  name?: string;
}
const PasswordField = ({
  changeHandler,
  value,
  placeholder,
  name,
}: PasswordFieldProp) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <input
        value={value}
        required
        placeholder={placeholder}
        name={name}
        type={showPassword ? "text" : "password"}
        onChange={changeHandler}
      />
      <IconButton
        size="small"
        onClick={handleClickShowPassword}
        sx={{ position: "absolute", right: "2px" }}
      >
        {showPassword ? (
          <Visibility
            sx={{
              fontSize: { sm: "1.6vmax", xs: "3vmax" },
            }}
          />
        ) : (
          <VisibilityOff
            sx={{
              fontSize: { sm: "1.6vmax", xs: "3vmax" },
            }}
          />
        )}
      </IconButton>
    </>
  );
};

export default PasswordField;
