import LoginForm from "./components/Login/LoginForm";
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Login() {

    const { data: user, error: userError } = useSWR('/api/user', fetcher);

    const router = useRouter();
    
    if (!user) {
        return <div>Loading...</div>;
      }

    
  console.log(user)

  return (
    <>
      <LoginForm />
    </>
  )
}
