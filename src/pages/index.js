import { useRouter } from "next/router";
import LoginForm from "./components/Login/LoginForm";
import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data: user, error: userError } = useSWR('/api/user', fetcher);

  const { data: share, error: shareError } = useSWR('/api/songs/get_song', fetcher);

  const router = useRouter();

  console.log(user)

  console.log(share)

  if (!user) {
    return <div>Loading...</div>;
  }

  if(!share){
    return <div>Loading...</div>;
  }

  if (!user.isLoggedIn) {
    router.push('/log-in');
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div className="grid grid-cols-4 auto-rows-min w-full h-screen">
        {share.map((share) => (
          <div key={share.artist} className="bg-gray-100 p-4 m-4 rounded-lg mt-24 flex flex-col">
            <h1 className="text-2xl font-bold m-2">{share.song}</h1>
            <h2 className="text-xl font-bold m-2">{share.artist}</h2>
            <p className="text-md m-2">{share.description}</p>
            <p className="text-md m-2">#{share.genre.replace(",", " #")}</p>
            <p className="text-md m-2">{share.name}</p>
          </div>

        ))
        }
      </div>
    </>
  )
}
