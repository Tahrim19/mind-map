import { requests } from "@/requests";

export const handleRegister = async ({
  username,
  password,
  navigate,
}: {
  username: string;
  password: string;
  navigate: (path: string) => void;
}): Promise<void> => {
  try {
    const res = await fetch(requests.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Registration failed");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ username }));
    navigate("/dashboard");
  } catch (err: any) {
    alert(err.message);
  }
};
