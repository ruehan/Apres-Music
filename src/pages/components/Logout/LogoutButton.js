function LogoutButton() {
    const router = useRouter();
  
    const handleLogout = async () => {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
  
      if (response.ok) {
        router.push("/login");
      } else {
        // handle error
      }
    };
  
    return (
      <button onClick={handleLogout}>Logout</button>
    );
  }
  
  export default LogoutButton;
  