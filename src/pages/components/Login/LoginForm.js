import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { data: session } = useSWR("/api/user", fetcher);

  const clickSignup = () => {
    router.push("/sign-up");
  };

  if (session?.isLoggedIn) {
    router.push("/");
  }

  const onSubmit = async (formData) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/");
    } else {
      // handle error
    }
  };

  return (
    <section className="grid grid-cols-2 w-full h-screen overflow-hidden">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-screen flex flex-col p-48">
        <h1 className="font-bold text-2xl mb-4">Login</h1>
        
        <label className="font-bold">Username</label>
        <input {...register("name", { required: true })} type="text" className="w-2/3 h-10 mt-4 border-2 border-gray-200" />
        {errors.email && <p className="text-red-500 mb-4 font-bold">This field is required</p>}

        <label className="font-bold">Password</label>
        <input {...register("password", { required: true })} type="password" className="w-2/3 h-10 mt-4 border-2 border-gray-200"/>
        {errors.password && <p className="text-red-500 mb-4 font-bold">This field is required</p>}

        <button type="submit"  className="w-24 h-10 bg-red-500 text-white font-bold mt-4">Login</button>
        <div className="flex">
          <div>Dont have a profile?</div>
          <div onClick={clickSignup} className="text-blue-300 ml-4 cursor-pointer">Sign up for FREE</div>
        </div>
      </form>
      
      </div>
      <div className="bg-music bg-center w-full h-screen">

      </div>
    </section>
  );
}

export default LoginForm;
