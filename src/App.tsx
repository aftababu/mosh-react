interface User {
  id: number;
  name: string;
}

import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosError, CanceledError } from "axios";
// import Form from "./components/Form";
// import Exersize from './components/Exersize'

function App() {
  const [user, setUser] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    // const fetchData = async () => {
    //   try {
    //     const res = await axios.get(
    //       `https://jsonplaceholder.typicode.com/users`,
    //       { signal: controller.signal }
    //     );
    //     setUser(res.data);
    //   } catch (err) {
    //     if (err instanceof CanceledError) return;
    //     setError((err as AxiosError).message);
    //   }
    //   return () => controller.abort();
    // };
    // fetchData();
    axios
      .get(`https://jsonplaceholder.typicode.com/users`, {
        signal: controller.signal,
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      });
    return () => controller.abort();
  }, []);
  const handleDelete = (id: number) => {
    const originlUsers = [...user];
    setUser((prev) => prev.filter((item) => item.id !== id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/xusers/${id}`)
      .catch((err) => {
        setError(err.message);
        setUser(originlUsers);
      });
  };
  console.log(user);
  return (
    <>
      {/* <Form/> */}
      {/* <Exersize/> */}
      <ul className="list-group list-group-numbered ">
        {user.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between"
          >
            {item.name}{" "}
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
        <li>{error}</li>
      </ul>
    </>
  );
}

export default App;
