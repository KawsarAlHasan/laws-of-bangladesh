import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

function FullLaws() {
  document.title = "Child Category || Laws of Bangladesh";

  const { parentId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [parentCategory, setParentCategory] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/parentcategory/${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setParentCategory(data);
        setIsLoading(false);
      });
  }, [parentId]);

  const [childCategory, setChildCategory] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  useEffect(() => {
    setIsLoading2(true);
    fetch(`http://localhost:5000/childcategory/search?parentCtgId=${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setChildCategory(data);
        setIsLoading2(false);
      });
  }, [parentId]);

  const [headLine, setHeadLine] = useState([]);
  const [isLoading3, setIsLoading3] = useState(false);
  useEffect(() => {
    setIsLoading3(true);
    fetch(`http://localhost:5000/headline/search?parentCtgId=${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setHeadLine(data);
        setIsLoading3(false);
      });
  }, [parentId]);
  return (
    <div>
      <h2 className="text-center text-4xl my-4">
        Laws of <span className="text-[red]">Bangladesh</span>
      </h2>
      <h6 className="text-center text-2xl">{parentCategory?.parentCategory}</h6>
      <h6 className="text-center text-xl">
        Number of Law: {parentCategory?.numberOfLaws}
      </h6>

      <div className="card  bg-base-100 shadow-xl">
        {headLine.map((hdln) => (
          <div key={hdln._id} className="card-body">
            <h2 className="text-center font-bold">{hdln.lawHeadline}</h2>
            <p>{hdln.preamble}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <tbody>
            {isLoading2 ? (
              <Loading />
            ) : (
              childCategory.map((cldCtr) => (
                <tr key={cldCtr._id}>
                  <td>{cldCtr.sectionsName}</td>
                  <td>{cldCtr.sectionsDetails}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FullLaws;
