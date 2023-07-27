import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
import useSWR from 'swr';
import { useRouter } from 'next/router';


const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Signup() {

    const { data: user, error: userError } = useSWR('/api/user', fetcher);

    const router = useRouter();
    if(!user){
        return <div>Loading...</div>
    }

  return (
    <>
      <SignupForm />
    </>
  )
}
