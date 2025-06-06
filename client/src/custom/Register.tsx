import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { handleRegister } from "./handlers/handleRegister";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await handleRegister({ username, password, navigate });
  } catch (err: any) {
    console.error("Unhandled error:", err);
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-[350px] p-6">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
