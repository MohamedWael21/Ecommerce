import { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import HelmetData from "../layout/HelmetData";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navgiate = useNavigate();
  const searchSubmitHandler = () => {
    if (keyword.trim()) {
      navgiate(`/products/${keyword}`);
    } else {
      navgiate(`/products`);
    }
  };
  return (
    <>
      <HelmetData title="Search A Product -- Ecommerce" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
