import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

// const categories = ['Grocery', 'Utilities', 'entertainment'];

interface Item {
  id: string;
  description: string;
  category: string;
  amount: number;
}

const Exersize = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Item>();
  const categories=[
    "Grocery",
    "Utilities",
    "entertainment",
  ]
  const [data, setData] = useState<Item[]>([
    {
      id: "ksjadkjasdsad",
      description: "milk",
      category: "Grocery",
      amount: 100,
    },
    {
      id: "adkjsdkjhd",
      description: "football",
      category: "entertainment",
      amount: 200,
    },
  ]);
  const [filteredData, setFilteredData] = useState<Item[]>(data);
  const handleDelete = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };
  const onSubmit = (data: FieldValues) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      description: data.description,
      category: data.category,
      amount: data.amount !== "" ? parseFloat(data.amount) : 0,
    };
    setData((prevData) => [...prevData, newItem]);
    reset()
    // console.log(data);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    if (value === "All categories") {
      setFilteredData(data);
    } else {
      setFilteredData((prev) => data.filter((item) => item.category === value));
    }
    console.log(value);
  };
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  // console.log(data);
  return (
    <div className="container">
      <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 ">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description", { required: true, maxLength: 20 })}
          />
          {errors.description?.type === "required" && (
            <p className="text-danger"> description is required</p>
          )}
          {errors.description?.type === "maxLength" && (
            <p className="text-danger">
              {" "}
              description cannot be grater than 20 character
            </p>
          )}
        </div>
        <div className="my-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            {...register("amount", { required: true, maxLength: 8 })}
          />
          {errors.amount?.type === "required" && (
            <p className="text-danger"> amount is required</p>
          )}
          {errors.amount?.type === "maxLength" && (
            <p className="text-danger">
              {" "}
              amount cannot be grater than 8 character
            </p>
          )}
        </div>
        <label htmlFor="category">Select a category:</label>
        <select
          className="form-select"
          id="category"
          {...register("category", { required: true })}
        >
          <option value="" />
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category?.type === "required" && (
          <p className="text-danger"> category is required</p>
        )}

        <div className="my-3">
          <button className="btn btn-primary" type="submit">
            submit
          </button>
        </div>
      </form>
      <select
        className="form-select mt-4 mb-3"
        id="category"
        onChange={handleChange}
      >
        <option value="All categories">All categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>${item.amount}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exersize;
