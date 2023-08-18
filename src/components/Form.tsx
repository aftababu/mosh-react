import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string(),
  password: z.string().min(8,{message:'fool 8'}),
});

// interface User {
//   email: string;
//   password: string;
// }
type User = z.infer<typeof schema>;
const Form: React.FC = () => {
  // const {register,handleSubmit,formState:{errors}} =useForm<User>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(schema) });
  // console.log(formState.errors);
  // console.log(register('name'));
  //   const emailRef = useRef<HTMLInputElement>(null);
  //   const passRef = useRef<HTMLInputElement>(null);
  //   const [user, setUser] = useState<User>({
  //     email: "",
  //     password: "",
  //   });

  //   const handleSubmit = (e: FormEvent) => {
  //     e.preventDefault();

  // if (emailRef.current) {
  //   // const newEmail = emailRef.current.value ?? "";
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     email: emailRef.current?.value ?? "",
  //   }));
  // }
  // if (passRef.current) {

  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     password: passRef.current?.value ?? "",
  //   }));
  // }
  //   };
  //   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const { id, value } = e.currentTarget;
  //     setUser((prevUser) => ({ ...prevUser, [id]: value }));
  //   };
  //   console.log(user);
  return (
    <form onSubmit={handleSubmit((data:FieldValues) => console.log(data))}>
      {/* <form onSubmit={}> */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          //   ref={emailRef}
          id="email"
          type="email"
          className="form-control"
            // {...register('email',{required:true,minLength:3})}
            {...register('email')}

          //   value={user.email}
          //   onChange={handleChange}
        />
        {/* {errors.email?.type==='required'&&<p className="text-danger">Email is required</p>} */}
        {errors.email &&<p className="text-danger">{errors.email.message}</p>}
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          //   ref={passRef}
          id="password"
          type="password"
          className="form-control"
          //   {...register('password',{required:true,minLength:8})}
            {...register('password')}
          //   value={user.password}
          //   onChange={handleChange}
        />
   
        {/* {errors.password?.type === "required" && (
          <p className="text-danger">password is required</p>
        )} */}
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}

        <button className="btn btn-primary mt-4">submit</button>
      </div>
    </form>
  );
};

export default Form;
