import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import "./checkOutStep.css";

interface CheckOutStepProp {
  activeStep: number;
}
const CheckOutStep = ({ activeStep }: CheckOutStepProp) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>payment</Typography>,
      icon: <AccountBalance />,
    },
  ];
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep >= index}
          >
            <StepLabel
              icon={item.icon}
              sx={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.689)",
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckOutStep;
