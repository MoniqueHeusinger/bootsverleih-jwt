import { backendUrl } from "../api";

const LogoutButton = () => {
  async function doLogout() {
    const response = await fetch(backendUrl + "/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    const { success } = await response.json();
    if (!success) alert("Could not logout");
    onLogout(); // reset local authorization state (token enthalten)
  }

  return (
    <>
      <button className="btn" onClick={doLogout}>
        logout
      </button>
    </>
  );
};

export default LogoutButton;
