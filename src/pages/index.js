import { useRouter } from "next/router";
import LoginForm from "./components/Login/LoginForm";
import useSWR, { mutate } from "swr";
import Playlist from "./layout/Playlist";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data: user, error: userError } = useSWR('/api/user', fetcher);

  // 다른 방식으로 변경 필요 
  const { data: share, error: shareError } = useSWR('/api/songs/get_song', fetcher);


  const router = useRouter();

  const requestUpdate = async (id, addr) => {
    await fetch(addr, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id
      })

    })
  }

  const clickLike = async (e) => {
    const id = e.target.id

    if(!share) return;

    await requestUpdate(id, '/api/songs/change_like')
 
    mutate('/api/songs/get_song')
    // router.push('/')
  }

  const clickDelete = async (e) => {
    const id = e.target.id

    if(!share) return;

    await requestUpdate(id, '/api/songs/delete')
 
    // mutate('/api/songs/get_song')

  }


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


  console.log(share)
  
  return (
    <>
      <div className="grid grid-cols-4 auto-rows-min w-full h-screen">
        {share.map((share) => (
          <div key={share.id} className="bg-gray-100 p-4 m-4 rounded-lg mt-24 flex flex-col relative">
            <h1 className="text-2xl font-bold m-2">{share.song}</h1>
            <h2 className="text-xl font-bold m-2">{share.artist}</h2>
            <p className="text-md m-2">{share.description}</p>
            <p className="text-md m-2">#{share.genre.replace(",", " #")}</p>
            <p className="text-md m-2">{share.name}</p>

            {share.isLiked ? <AiFillHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 z-0 absolute right-4 bottom-0"/> :
              <AiOutlineHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 z-0 absolute right-4 bottom-0"/>}

            <div className="absolute w-8 h-8 right-4 bottom-4 z-30 cursor-pointer flex justify-center items-center text-sm font-bold" onClick={clickLike} id={share.id}>{share.likes}</div>
              

            {share.name === user.name ? (
              <div className="absolute top-6 right-4 w-12 h-8 bg-blue-200 rounded-xl flex justify-center items-center" onClick={clickDelete} id={share.id} >delete</div>
            ) : null}
          </div>

        ))
        }
      </div>

      <Playlist />
    </>
  )
}
