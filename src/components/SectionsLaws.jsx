import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

function SectionsLaws() {
  document.title = "Child Category || Laws of Bangladesh";

  const { parentId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [parentCategory, setParentCategory] = useState([]);

  const parentCategoryname = parentCategory?.parentCategory;
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

  const handleFullLaw = () => {
    navigate(`fullLaw`);
  };

  const [sections, setSections] = useState([]);
  const [sectionsId, setSectionsId] = useState([]);
  const [isLoading4, setIsLoading4] = useState(false);

  useEffect(() => {
    setIsLoading4(true);
    fetch(`http://localhost:5000/childcategory/${sectionsId}`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setIsLoading4(false);
      });
  }, [sectionsId]);

  const handleDetails = (id) => {
    setSectionsId(id);
  };

  if (isLoading || isLoading2 || isLoading3) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-center text-4xl my-4">
        Laws of <span className="text-[red]">Bangladesh</span>
      </h2>
      <h6 className="text-center text-lg"> {parentCategoryname} </h6>

      <div>
        <div className="card  bg-base-100 shadow-xl">
          {headLine.map((hdln) => (
            <div key={hdln._id} className="card-body">
              <h2 className="card-title">{hdln.lawHeadline}</h2>
              <p>{hdln.preamble}</p>
              <div className="card-actions justify-end">
                <button onClick={handleFullLaw} className="btn btn-primary">
                  Click here to view the full Law
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Sections Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {isLoading2 ? (
              <Loading />
            ) : (
              childCategory.map((cldCtr, index) => (
                <tr key={cldCtr._id}>
                  <th>{index + 1}</th>
                  <td>{cldCtr.sectionsName}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        document.getElementById("show_modal_5").showModal()
                      }
                    >
                      <span onClick={() => handleDetails(cldCtr._id)}>
                        Details
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <dialog id="show_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {isLoading4 ? (
            <Loading />
          ) : (
            <>
              <h3 className="font-bold text-lg">{sections?.sectionsName}</h3>
              <p className="py-4">{sections?.sectionsDetails}</p>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default SectionsLaws;
