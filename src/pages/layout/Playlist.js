import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout/LogoutButton';
import { data } from 'autoprefixer';
import useSWR, { mutate } from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());



export default function Playlist() {

    const { data: user, error: userError } = useSWR('/api/user', fetcher);

    // const { data: share, error: shareError } = useSWR('/api/songs/get_song', fetcher);

    const [playlist, setPlaylist] = useState(false)

    const [song, setSong] = useState([])

    const onClick = () => {
        setPlaylist(!playlist)
        const fetchSong = async () => {
            const res = await fetch('/api/songs/get_song');
            const data = await res.json()

            console.log(data)
            setSong(data)
        }

        fetchSong()

    }

    return (
        <>
            {playlist ? (
                <div className="fixed bottom-24 right-4 w-1/6 h-5/6 bg-white/50 rounded-3xl backdrop-blur-sm border-2 border-gray-300 z-50 grid grid-flow-row auto-rows-max" id='playlist'>
                    {
                        song.map((song) => (
                            song.isLiked ? (
                                <div key={song.id} className="flex w-full h-24 justify-center items-center">
                                    <p className="m-2 text-md font-bold">{song.song}</p>
                                    <p className="m-2 text-sm">{song.artist}</p>
                                </div>
                            ) : null
                        ))
                    }
                </div>
            ) : (
                null
            )}
            <div className="fixed bottom-4 right-4 w-24 h-16 bg-gray-200 rounded-3xl text-xl font-bold flex justify-center items-center" onClick={onClick}>Playlist</div>
        </>
    )
} 