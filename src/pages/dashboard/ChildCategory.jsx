import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import HeadlinePreamble from "./HeadlinePreamble";

function ChildCategory() {
  document.title = "Child Category || Laws of Bangladesh";

  const { parentId } = useParams();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const childData = {
      sectionsName: data.sectionsName,
      sectionsDetails: data.sectionsDetails,
      parentCtgId: parentId,
    };
    fetch("http://localhost:5000/childcategory", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(childData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast(`Child Category added is successful`);
          window.location.reload(false);
        } else {
          toast.error(`oh no! Child Category added is not successful`);
        }
      });
  };

  // uadate
  const heandleUpdate = async (even) => {
    even.preventDefault();
    const updateData = {
      sectionsName: even.target.sectionsName.value,
      sectionsDetails: even.target.sectionsDetails.value,
    };
    const urlLink = `http://localhost:5000/childcategory/${sectionsId}`;
    fetch(urlLink, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        window.location.reload(false);
      });
  };

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

  // delete
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to delete this Sections?");
    if (proceed) {
      const url = `http://localhost:5000/childcategory/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast(`Parent Category Delete Successfully`);
            window.location.reload(false);
          } else {
            toast.error(`oh no! Parent Category not Delete Successfully`);
          }
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleDetails = (id) => {
    setSectionsId(id);
  };
  const handleUpadate = (id) => {
    setSectionsId(id);
  };

  return (
    <div>
      <h2 className="text-center text-4xl my-4">
        Laws of <span className="text-[red]">Bangladesh</span>
      </h2>
      <h6 className="text-center text-lg"> {parentCategoryname} </h6>

      <div class="grid grid-cols-2 gap-4">
        <HeadlinePreamble></HeadlinePreamble>
        <form className="mx-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Sections Name</span>
            </label>
            <input
              type="text"
              placeholder="Sections Name.."
              {...register("sectionsName", {
                required: "Sections is required",
              })}
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <span className="label-text-alt">
              {errors.sectionsName && (
                <p className="text-[red]">{errors.sectionsName?.message}</p>
              )}
            </span>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Sections Details</span>
            </label>
            <textarea
              className="textarea textarea-accent textarea-bordered h-24"
              {...register("sectionsDetails", {
                required: "Sections is required",
              })}
              placeholder="Sections Details..."
            ></textarea>
            <span className="label-text-alt">
              {errors.sectionsDetails && (
                <p className="text-[red]">{errors.sectionsDetails?.message}</p>
              )}
            </span>
          </div>

          <input
            className="btn btn-primary mt-1"
            value="Add Section Category"
            type="submit"
          />

          {errors.exampleRequired && <span>This field is required</span>}
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Child Category Name</th>
              <th>Details</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading2 ? (
              <Loading />
            ) : (
              childCategory?.map((cldCtr, index) => (
                <tr key={cldCtr._id}>
                  <th>{index + 1}</th>
                  <td>{cldCtr.sectionsName}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        document.getElementById("show_details_5").showModal()
                      }
                    >
                      <span onClick={() => handleDetails(cldCtr._id)}>
                        Details
                      </span>
                    </button>
                  </td>
                  <td>
                    {/* update modal */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      <span onClick={() => handleDetails(cldCtr._id)}>
                        <span onClick={() => handleUpadate(cldCtr._id)}>
                          Update
                        </span>
                      </span>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(cldCtr._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* datails */}
        <dialog
          id="show_details_5"
          className="modal modal-bottom sm:modal-middle"
        >
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

        {/* update  */}
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form className="mx-2" onSubmit={heandleUpdate}>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Sections Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Law Headline.."
                  defaultValue={sections.sectionsName}
                  name="sectionsName"
                  className="input input-sm input-bordered input-accent w-full max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Sections Details</span>
                </label>
                <textarea
                  className="textarea textarea-sm textarea-accent textarea-bordered h-24"
                  name="sectionsDetails"
                  defaultValue={sections.sectionsDetails}
                  placeholder="sections Details..."
                ></textarea>
              </div>

              <input
                className="btn btn-primary btn-sm mt-1"
                value="Update Sections"
                type="submit"
              />
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default ChildCategory;
