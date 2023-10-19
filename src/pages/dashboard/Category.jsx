import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loading from '../../components/Loading';
import { useNavigate } from "react-router-dom";

function Category() {
    document.title = 'Grand Category || Laws of Bangladesh';

    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      fetch("http://localhost:5000/grandcategory", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast(`Grand Category added is successful`);
            window.location.reload(false);
          } else {
            toast.error(`oh no! Grand Category added is not successful`);
          }
        });
    };

    const [grandCategory, setGrandCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true)
      fetch(`http://localhost:5000/grandcategory`)
        .then((res) => res.json())
        .then((data) => {
          setGrandCategory(data);
          setIsLoading(false)
        });
    }, []);

    // delete 
    const handleDelete = (id) => {
      console.log(id);
      const proceed = window.confirm("Are you sure to delete this Grand Category?");
      if (proceed) {
        const url = `http://localhost:5000/grandcategory/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast(`Grand Category Delete Successfully`);
              window.location.reload(false);
            } else {
              toast.error(`oh no! Grand Category not Delete Successfully`);
            }
          });
      }
    };

    const handleGrandCategory = (id) => {
      navigate(`parent/${id}`);
    };

  return (
    <div className=''>
        <h2 className='text-center text-4xl my-4'>Grand <span className='text-[red]'>Category</span></h2>

        <form className="mx-2" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Grand Category Name.." {...register("grandCategory", { required: "Grand category is required" })} className="input input-bordered input-accent w-full max-w-xs" />
        
            <input
              className="btn btn-primary"
              value="Add Grand Category"
              type="submit"
            />
            {errors.grandCategory && (
              <p className="text-[red]">{errors.grandCategory?.message}</p>
            )}
        {errors.exampleRequired && <span>This field is required</span>}
      </form>

      <div className="overflow-x-auto">
  <table className="table table-zebra">
    <thead>
      <tr>
        <th></th>
        <th>Grand Category Name</th>
        <th>Parent Category</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {isLoading? <Loading />: grandCategory.map((gdctr, index) => (<tr key={gdctr._id}>
          <th>{index + 1}</th>
        <td>{gdctr.grandCategory}</td>
        <td><button className="btn btn-sm btn-success" onClick={() => handleGrandCategory(gdctr._id)}>Parent Category</button></td>
        <td><button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(gdctr._id)}>Delete</button></td>
        </tr>))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default Category