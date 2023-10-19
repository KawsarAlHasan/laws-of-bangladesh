import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

function ParentCategory() {
  document.title = "Parent Category || Laws of Bangladesh";

  const navigate = useNavigate();

  const { grandId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const parentData = {
      parentCategory: data.parentCategory,
      numberOfLaws: data.numberOfLaws,
      grandCtgId: grandId,
    };
    fetch("http://localhost:5000/parentcategory", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(parentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast(`Parent Category added is successful`);
          window.location.reload(false);
        } else {
          toast.error(`oh no! Parent Category added is not successful`);
        }
      });
  };

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

  // uadate
  // const heandleUpdate = async (even) => {
  //   even.preventDefault();
  //   const updateData = {
  //     parentCategory: even.target.parentCategory.value,
  //     numberOfLaws: even.target.numberOfLaws.value,
  //   };
  //   const parentId = even.target.parentId.value;
  //   const urlLink = `http://localhost:5000/parentcategory/${parentId}`;
  //   fetch(urlLink, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(updateData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("success", data);
  //       window.location.reload(false);
  //     });
  // };

  // delete
  const handleDelete = (id) => {
    console.log(id);
    const proceed = window.confirm(
      "Are you sure to delete this Parent Category?"
    );
    if (proceed) {
      const url = `http://localhost:5000/parentcategory/${id}`;
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
      <h6 className="text-center text-lg"> {grandCategoryname} </h6>

      <form className="mx-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Laws Name</span>
          </label>
          <input
            type="text"
            placeholder="Laws Name.."
            {...register("parentCategory", {
              required: "Laws is required",
            })}
            className="input input-bordered input-accent w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt">
              {errors.parentCategory && (
                <p className="text-[red]">{errors.parentCategory?.message}</p>
              )}
            </span>
          </label>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Number of Laws</span>
          </label>
          <input
            type="text"
            placeholder="Number of Laws.."
            {...register("numberOfLaws", {
              required: "Number of Laws is required",
            })}
            className="input input-bordered input-accent w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt">
              {errors.numberOfLaws && (
                <p className="text-[red]">{errors.numberOfLaws?.message}</p>
              )}
            </span>
          </label>
        </div>

        <input className="btn btn-primary" value="Add Laws" type="submit" />

        {errors.exampleRequired && <span>This field is required</span>}
      </form>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Laws Name</th>
              <th>Number of Laws</th>
              <th>Child Category</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading2 ? (
              <Loading />
            ) : (
              parentCategory.map((prtctr, index) => (
                <tr key={prtctr._id}>
                  <th>{index + 1}</th>
                  <td>{prtctr.parentCategory}</td>
                  <td>{prtctr.numberOfLaws}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleParentCategory(prtctr._id)}
                    >
                      Child Category
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Update
                    </button>
                    <dialog
                      id="my_modal_3"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <form className="mx-2">
                          <input
                            type="text"
                            defaultValue={prtctr._id}
                            name="parentId"
                            className="hidden"
                          />
                          <div className="form-control w-full ">
                            <label className="label">
                              <span className="label-text">Laws Name</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Laws Name.."
                              defaultValue={prtctr.parentCategory}
                              name="parentCategory"
                              className="input input-sm input-bordered input-accent w-full max-w-xs"
                            />
                          </div>
                          <div className="form-control w-full ">
                            <label className="label">
                              <span className="label-text">Number of Laws</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Number of Laws.."
                              defaultValue={prtctr.numberOfLaws}
                              name="numberOfLaws"
                              className="input input-sm input-bordered input-accent w-full max-w-xs"
                            />
                          </div>

                          <input
                            className="btn btn-primary btn-sm mt-1"
                            value="Update Laws"
                            type="submit"
                          />
                        </form>
                      </div>
                    </dialog>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(prtctr._id)}
                    >
                      Delete
                    </button>
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

export default ParentCategory;
