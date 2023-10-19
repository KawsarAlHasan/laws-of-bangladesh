import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchResults from "../pages/SearchItems";

function Main() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (e) => {
    if (e.length >= 0) {
      setSearchText(e);
      setShowSearchResults(true);
      navigate("/search");
    }
  };
  return (
    <div>
      <Navbar onSearch={handleSearch}></Navbar>
      <div className="lg:mx-16">
        {showSearchResults ? (
          <SearchResults searchText={searchText} />
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Main;
