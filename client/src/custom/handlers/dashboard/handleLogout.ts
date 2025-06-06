export const handleLogout = (navigate: (path: string) => void) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  navigate("/");
};
