import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';


function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (formData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/log-in");
    } else {
      const error = await response.json();
      console.error(error.message);
    }
  };

  return (
    <>
        <section className="grid grid-cols-2 w-full h-screen overflow-hidden">
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-screen flex flex-col p-48">
                    <h1 className="font-bold text-2xl mb-4">Create your account</h1>

                    <label className="font-bold">Username</label>
                    <input {...register("name", { required: true })} type="text" className="w-2/3 h-10 mt-4 border-2 border-gray-200"/>
                    {errors.email && <p className="text-red-500 mb-4 font-bold">This field is required</p>}

                    <label className="font-bold">Email</label>
                    <input {...register("email", { required: true })} type="email" className="w-2/3 h-10 mt-4  border-2 border-gray-200"/>
                    {errors.email && <p className="text-red-500 mb-4 font-bold">This field is required</p>}

                    <label className="font-bold">Password</label>
                    <input {...register("password", { required: true })} type="password" className="w-2/3 h-10 mt-4  border-2 border-gray-200"/>
                    {errors.password && <p className="text-red-500 mb-4 font-bold">This field is required</p>}

                    <button type="submit" className="w-24 h-10 bg-red-500 text-white font-bold mt-4">Sign Up</button>
                </form>
            </div>
            <div className="bg-music bg-center w-full h-screen">

            </div>
        </section>
    </>
  );
}

export default SignupForm;
