import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

function SearchItems({ searchText }) {
  const navigate = useNavigate();

  const [parentCategory, setParentCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/parentcategory`)
      .then((res) => res.json())
      .then((data) => {
        setParentCategory(data);
        setIsLoading(false);
      });
  }, [searchText]);

  let lowercaseValue = searchText?.toLowerCase();

  if (searchText?.length === 0) {
    return (
      <h2 className="text-center my-4 text-xl">
        You have not searched for anything
      </h2>
    );
  }

  const handleParentCategory = (id) => {
    navigate(`child/${id}`);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : parentCategory.filter(
          (prtc) =>
            prtc.parentCategory.toLowerCase().includes(lowercaseValue) ||
            prtc.numberOfLaws.toLowerCase().includes(lowercaseValue)
        )?.length === 0 ? (
        <h2 className="text-center my-4">
          Sorry, we can not find this product 😞
        </h2>
      ) : (
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Laws Name</th>
              <th>Number of Laws</th>
            </tr>
          </thead>
          <tbody>
            {parentCategory
              .filter(
                (prtctr) =>
                  prtctr.parentCategory
                    .toLowerCase()
                    .includes(lowercaseValue) ||
                  prtctr.numberOfLaws.toLowerCase().includes(lowercaseValue)
              )
              .map((prtctr, index) => (
                <tr
                  onClick={() => handleParentCategory(prtctr._id)}
                  key={prtctr._id}
                >
                  <th>{index + 1}</th>
                  <td className="cursor-pointer hover:text-primary">
                    {prtctr.parentCategory}
                  </td>
                  <td className="cursor-pointer hover:text-primary">
                    {prtctr.numberOfLaws}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchItems;
