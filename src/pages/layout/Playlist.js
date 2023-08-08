import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout/LogoutButton';
import { data } from 'autoprefixer';


// const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Playlist() {

    const [playlist, setPlaylist] = useState(false)

    const onClick = () => {
        setPlaylist(!playlist)
    }

    return (
        <>
            {playlist ? (
                <div className="fixed bottom-24 right-4 w-1/6 h-5/6 bg-white/20 rounded-3xl backdrop-blur-sm " id='playlist'></div>
            ) : (
                null
            )}
            <div className="fixed bottom-4 right-4 w-24 h-16 bg-gray-200 rounded-3xl text-xl font-bold flex justify-center items-center" onClick={onClick}>Playlist</div>
        </>
    )
} 