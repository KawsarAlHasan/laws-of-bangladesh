import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

function HeadlinePreamble() {
  const { parentId } = useParams();

  const headlineSubmit = async (even) => {
    even.preventDefault();
    const headlineData = {
      lawHeadline: even.target.lawHeadline.value,
      preamble: even.target.preamble.value,
      parentCtgId: parentId,
    };
    fetch("http://localhost:5000/headline", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(headlineData),
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

  const heandleUpdate = async (even) => {
    even.preventDefault();
    const headlineData = {
      lawHeadline: even.target.lawHeadline.value,
      preamble: even.target.preamble.value,
    };
    const lawHeadlineId = even.target.lawHeadlineId.value;
    const urlLink = `http://localhost:5000/headline/${lawHeadlineId}`;
    fetch(urlLink, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(headlineData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        window.location.reload(false);
      });
  };

  // delete
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to delete this Head Line?");
    if (proceed) {
      const url = `http://localhost:5000/headline/${id}`;
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

  const [headLine, setHeadLine] = useState([]);
  const [isLoading2, setIsLoading2] = useState(false);
  useEffect(() => {
    setIsLoading2(true);
    fetch(`http://localhost:5000/headline/search?parentCtgId=${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setHeadLine(data);
        setIsLoading2(false);
      });
  }, [parentId]);

  if (isLoading2) {
    return <Loading />;
  }

  return (
    <div>
      {headLine.length === 0 ? (
        <form className="mx-2" onSubmit={headlineSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Law Healine</span>
            </label>
            <input
              type="text"
              placeholder="Law Headline.."
              name="lawHeadline"
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Preamble</span>
            </label>
            <textarea
              className="textarea textarea-accent textarea-bordered h-24"
              name="preamble"
              placeholder="Preamble..."
            ></textarea>
          </div>

          <input
            className="btn btn-primary mt-1"
            value="Add Headline & Preamble"
            type="submit"
          />
        </form>
      ) : (
        <div className="card  bg-base-100 shadow-xl">
          {headLine.map((hdln) => (
            <div key={hdln._id} className="card-body">
              <h2 className="card-title">{hdln.lawHeadline}</h2>
              <p>{hdln.preamble}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    document.getElementById("update_modal_3").showModal()
                  }
                >
                  Update
                </button>
                <dialog id="update_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <form className="mx-2" onSubmit={heandleUpdate}>
                      <input
                        type="text"
                        defaultValue={hdln._id}
                        name="lawHeadlineId"
                        className="hidden"
                      />
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text">Law Healine</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Law Headline.."
                          defaultValue={hdln.lawHeadline}
                          name="lawHeadline"
                          className="input input-sm input-bordered input-accent w-full max-w-xs"
                        />
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Preamble</span>
                        </label>
                        <textarea
                          className="textarea textarea-sm textarea-accent textarea-bordered h-24"
                          name="preamble"
                          defaultValue={hdln.preamble}
                          placeholder="Preamble..."
                        ></textarea>
                      </div>

                      <input
                        className="btn btn-primary btn-sm mt-1"
                        value="Update Headline & Preamble"
                        type="submit"
                      />
                    </form>
                  </div>
                </dialog>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleDelete(hdln._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HeadlinePreamble;
