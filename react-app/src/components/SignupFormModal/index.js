import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal";
import {
  FaUpload
} from "react-icons/fa6";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [image, setImage] = useState(null);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== username) {
        setErrors([...errors, "Username cannot have leading or trailing spaces."]);
        return;
    }
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password, image));
        if (data) {
            setErrors(data);
        } else {
            closeModal();
        }
    } else {
        setErrors([
            "Confirm Password field must be the same as the Password field",
        ]);
    }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (validTypes.includes(file.type)) {
          setImage(file);
      } else {
          setErrors([...errors, "Invalid file type. Please upload a PNG, JPG, JPEG, or GIF image."]);
      }
  }
};


  return (
    <div className="signup-form">
      <h1 className="signup-form-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="error">
              {error}
            </li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="image-upload">
          <label htmlFor="profileImage">
            <div className="image-upload-placeholder">
              <FaUpload />{" "}
              Click to upload a profile image
            </div>
          </label>
          <input
            id="profileImage"
            type="file"
            onChange={handleImageChange}
            className="image-input"
            accept=".png, .jpg, .jpeg, .gif"
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default SignupFormPage;
