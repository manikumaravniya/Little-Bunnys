import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLogin } from "@/lib/api";
import { setAdminToken } from "@/lib/admin-auth";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await adminLogin(username.trim(), password);
      setAdminToken(response.token);
      navigate("/admin/dashboard");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-md">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Sign in to access the product dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
              </div>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
