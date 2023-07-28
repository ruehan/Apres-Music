import { useRouter } from 'next/router';

function LogoutButton() {
    const router = useRouter();
  
    const handleLogout = async () => {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
  
      if (response.ok) {
        router.push("/log-in");
      } else {
        // handle error
      }
    };
  
    return (
      <button onClick={handleLogout} className="ml-2 mr-2 bg-gray-300 text-xs w-24 h-10 font-bold rounded-md">Logout</button>
    );
  }
  
  export default LogoutButton;
  