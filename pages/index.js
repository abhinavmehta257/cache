import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function TwitterLoginButton() {
  const handleLogin = () => {
    signIn("twitter")
      .then(() => toast.success("Successfully logged in with Twitter!"))
      .catch(() => toast.error("Failed to log in with Twitter."));
  };

  return (
    <button onClick={handleLogin}>
      <i className="fab fa-twitter"></i> Sign in with Twitter
    </button>
  );
}
