import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function AllLaws() {
  const [grandCategory, setGrandCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/grandcategory`)
      .then((res) => res.json())
      .then((data) => {
        setGrandCategory(data);
        setIsLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handleGrandCategory = (id) => {
    navigate(`parent/${id}`);
  };
  return (
    <div>
      <h2 className="text-center text-4xl my-4">
        Laws of <span className="text-[red]">Bangladesh</span>
      </h2>
      <div class="grid grid-cols-2 gap-2 my-4">
        {isLoading ? (
          <Loading />
        ) : (
          grandCategory.map((gdctg) => (
            <div
              className="bg-primary-content cursor-pointer hover:text-primary p-4"
              key={gdctg._id}
              onClick={() => handleGrandCategory(gdctg._id)}
            >
              {gdctg.grandCategory}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllLaws;
