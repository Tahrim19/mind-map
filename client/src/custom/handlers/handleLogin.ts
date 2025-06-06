import { requests } from "@/requests";

export const handleLogin = async ({
  username,
  password,
  navigate,
}: {
  username: string;
  password: string;
  navigate: (path: string) => void;
}): Promise<void> => {
  const res = await fetch(requests.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ username }));
    navigate("/dashboard");
  } else {
    alert(data.message || "Login failed");
  }
};
