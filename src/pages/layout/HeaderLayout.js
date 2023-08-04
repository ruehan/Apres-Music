import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout/LogoutButton';
import { data } from 'autoprefixer';


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HeaderLayout() {

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            const data = await res.json()

            console.log(data)
            setIsLoggedIn(data.isLoggedIn);
        }
        fetchUser()
    })

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-16 bg-gray-900 fixed grid grid-cols-2">
            <div className="flex justify-start content-center items-center">
               <button className="text-white ml-2 mr-2 text-2xl w-24 h-10" onClick={() => router.push('/')}>Home</button>
            </div>
            <div className="flex justify-end content-center items-center">
                {isLoggedIn ? (
                    <>
                        <button className="ml-2 mr-2 bg-gray-300 text-xs w-24 h-10 font-bold rounded-md"  onClick={() => router.push("/share")}>Share</button>
                        <LogoutButton />
                    </>
                ) : (
                <div>
                    <button className="text-white ml-2 mr-2 text-xs w-24 h-10" onClick={() => router.push("/log-in")}>Log In</button>
                    <button className="ml-2 mr-2 bg-gray-300 text-xs w-24 h-10 font-bold rounded-md" onClick={() => router.push("/sign-up")}>SIGN UP</button>
                </div>)
                }
            </div>
        </div>
    )
} 