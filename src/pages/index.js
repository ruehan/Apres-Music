import { useRouter } from "next/router";
import LoginForm from "./components/Login/LoginForm";
import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data: user, error: userError } = useSWR('/api/user', fetcher);

  const router = useRouter();

  console.log(user)

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!user.isLoggedIn) {
    router.push('/log-in');
    return <div>Loading...</div>;
  }
  
  return (
    <>
      {user.email}
    </>
  )
}
