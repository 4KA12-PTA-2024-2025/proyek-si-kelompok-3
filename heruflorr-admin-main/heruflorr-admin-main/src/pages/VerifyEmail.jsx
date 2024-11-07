import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/email/verify/${id}`);
        alert("Email verified successfully.");
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    };
    verifyEmail();
  }, [id, navigate]);

  return <div>Verifying email...</div>;
};

export default VerifyEmail;
