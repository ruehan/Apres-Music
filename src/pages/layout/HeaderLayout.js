import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/Logout/LogoutButton';


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HeaderLayout({ userData }) {

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const user = fetcher('/api/user');

    // // const userData = user.json()

    // console.log(user)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            const data = await res.json()

            console.log(data)
            setIsLoggedIn(data.isLoggedIn);
        }

        fetchUser()
    })


    return (
        <div className="w-full h-16 bg-gray-900 fixed grid grid-cols-2">
            <div>

            </div>
            <div className="flex justify-end content-center items-center">
                {isLoggedIn ? (
                    <LogoutButton />
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