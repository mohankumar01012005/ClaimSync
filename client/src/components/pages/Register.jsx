"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  Stack,
  Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Custom styled components
const GradientPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(to bottom, #0a1929, #001e3c)",
  borderRadius: 0,
  height: "100vh",
  width: "60vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  color: "#fff",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  margin: "0 auto",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: theme.shape.borderRadius,
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiOutlinedInput-input": {
    color: "#fff",
  },
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  backgroundColor: "#fff",
  color: "#001e3c",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#0ABCF9",
  height: "100vh",
  width: "40vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added error state

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
  
      if (response.status == 200) {
        navigate("/login"); // ✅ Redirect to Home on Success
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!"); // Display error
    }
  };
  

  return (
    <Container maxWidth={false} disableGutters sx={{ overflow: "hidden" }}>
      <Stack direction="row" height="100vh">
        {/* Left - Signup Form */}
        <GradientPaper elevation={0} square>
          <FormContainer>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
              Register as a Patient
            </Typography>

            {error && <Alert severity="error">{error}</Alert>} {/* Show error if exists */}

            <form onSubmit={handleSubmit}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Username
              </Typography>
              <StyledTextField
                fullWidth
                id="name"
                name="name"
                placeholder="Enter your name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required="true"
              />

              <Typography variant="body1" sx={{ mb: 1 }}>
                Email
              </Typography>
              <StyledTextField
                fullWidth
                id="email"
                name="email"
                placeholder="your@email.com"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <Typography variant="body1" sx={{ mb: 1 }}>
                Password
              </Typography>
              <StyledTextField
                fullWidth
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <SignUpButton
              onClick={handleSubmit}
               fullWidth variant="contained" size="large">
                Sign Up
              </SignUpButton>

              <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "#fff" }}>
                Already have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/login")}
                  sx={{ color: "#0ABCF9", cursor: "pointer", fontWeight: "bold", ml: 1 }}
                >
                  Sign In
                </Link>
              </Typography>
            </form>
          </FormContainer>
        </GradientPaper>

        {/* Right - Image Section */}
        <ImageContainer>
          <Box
            component="img"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-11-27%20181616%201-XZ2GCctiI7XUilK8IEX9Xv61kM4bB3.png"
            alt="Person with smartphone illustration"
            sx={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
          />
        </ImageContainer>
      </Stack>
    </Container>
  );
}
