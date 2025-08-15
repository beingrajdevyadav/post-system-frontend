import React, { useState } from "react";
import styles from "../css/auth.module.css";


export default function Login({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Welcome Back</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.btn}>Login</button>
        <p className={styles.switchText}>
          Don’t have an account?{" "}
          <span onClick={onSwitch} className={styles.link}>Register</span>
        </p>
      </form>
    </div>
  );
}
