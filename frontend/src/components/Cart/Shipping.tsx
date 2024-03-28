import { Country, State } from "country-state-city";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import {
  Home,
  LocationCity,
  Phone,
  PinDrop,
  Public,
  TransferWithinAStation,
} from "@mui/icons-material";
import { saveShippingInfo } from "../../redux/slices/cartSlice";
import "./shipping.css";
import HelmetData from "../layout/HelmetData";
import CheckOutStep from "./CheckOutStep";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch = useAppDispatch();
  const { shippingInfo } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ city, address, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <HelmetData title="shipping Details" />
      <CheckOutStep activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form className="shippingForm" onSubmit={handleSubmit}>
            <div>
              <Home />
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>

            <div>
              <PinDrop />
              <input
                type="number"
                required
                value={pinCode || ""}
                onChange={(e) => setPinCode(Number(e.target.value))}
                placeholder="Pin Code"
              />
            </div>
            <div>
              <Phone />
              <input
                type="number"
                required
                value={phoneNo || ""}
                onChange={(e) => setPhoneNo(Number(e.target.value))}
                placeholder="Phone Number"
              />
            </div>
            <div>
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select Country
                </option>

                {Country.getAllCountries().map((country) => (
                  <option value={country.isoCode} key={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select State
                  </option>
                  {State.getStatesOfCountry(country).map((state) => (
                    <option value={state.isoCode} key={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <LocationCity />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={!state}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
