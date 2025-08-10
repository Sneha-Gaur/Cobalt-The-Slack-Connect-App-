import React, { useState } from "react";
import axios from "axios";

const LoginSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

      const response = await axios.post(endpoint, { email, password });
      alert(response.data.message || "Success!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div style={styles.container}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={styles.link}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  input: {
    padding: "10px",
    margin: "5px 0",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#4a154b",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  link: {
    marginTop: "15px",
    color: "#4a154b",
    cursor: "pointer",
  },
};

export default LoginSignup;
