import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./OtpVerify.css";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 boxes now
  const [message, setMessage] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setMessage("Please enter complete 6-digit OTP.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/user/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: fullOtp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "OTP verified successfully.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "OTP verification failed.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">🔐 Verify OTP</h2>
        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="otp-box"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputs.current[index] = el)}
            />
          ))}
        </div>
        <button className="otp-button" onClick={handleVerify}>
          Verify OTP
        </button>
        {message && <p className="otp-message">{message}</p>}
      </div>
    </div>
  );
};

export default OtpVerify;
