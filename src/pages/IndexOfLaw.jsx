import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function IndexOfLaw() {
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
  }, []);

  const handleParentCategory = (id) => {
    navigate(`child/${id}`);
  };
  return (
    <div className="mb-4">
      <h2 className="text-center text-4xl my-4">
        Index of Laws of <span className="text-[red]">Bangladesh</span>
      </h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Laws Name</th>
            <th>Number of Laws</th>
          </tr>
        </thead>
        <tbody>
          {parentCategory.map((prtctr, index) => (
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
    </div>
  );
}

export default IndexOfLaw;
