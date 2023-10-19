import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

function ParentLaws() {
  document.title = "Laws Name || Laws of Bangladesh";

  const navigate = useNavigate();

  const { grandId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [grandCategory, setGrandCategory] = useState([]);

  const grandCategoryname = grandCategory?.grandCategory;
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/grandcategory/${grandId}`)
      .then((res) => res.json())
      .then((data) => {
        setGrandCategory(data);
        setIsLoading(false);
      });
  }, [grandId]);

  const [parentCategory, setParentCategory] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  useEffect(() => {
    setIsLoading2(true);
    fetch(`http://localhost:5000/parentcategory/search?grandCtgId=${grandId}`)
      .then((res) => res.json())
      .then((data) => {
        setParentCategory(data);
        setIsLoading2(false);
      });
  }, [grandId]);

  const handleParentCategory = (id) => {
    navigate(`child/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-center text-4xl my-4">
        Laws of <span className="text-[red]">Bangladesh</span>
      </h2>
      <h6 className="text-center text-lg mb-2"> {grandCategoryname} </h6>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Laws Name</th>
              <th>Number of Laws</th>
            </tr>
          </thead>
          <tbody>
            {isLoading2 ? (
              <Loading />
            ) : (
              parentCategory.map((prtctr, index) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParentLaws;
