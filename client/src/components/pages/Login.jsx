"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  
  Link,
  useMediaQuery,
  useTheme,
  Switch,
  Stack
} from "@mui/material"
import axios from "axios"
import { styled } from "@mui/material/styles"
import { useNavigate } from 'react-router-dom';






// Custom styled components
const GradientPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(to bottom, #0a1929, #001e3c)",
  borderRadius: 0,
  height: "100vh",
  width:"60vw",    
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  color: "#fff",
}))

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  margin: "0 auto",
}))

const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  
  marginBottom: theme.spacing(6),
  "& svg": {
    marginRight: theme.spacing(1),
  },
}))

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#fff",
  marginLeft: theme.spacing(1),
}))

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
}))

const SignInButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  backgroundColor: "#fff",
  color: "#001e3c",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}))

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  textAlign: "center",
  display: "block",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#0ABCF9",
  height: "100vh",
  width:"40vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
}))

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const [error, setError] = useState("")
  const [isInsurer, setIsInsurer] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
         email,
         password
    });
      if (response.data.login) {
        localStorage.setItem("userId",JSON.stringify(response.data.userData)); // ✅ Store user data
        console.log(response.data);
        navigate(isInsurer ? "/insurer-dashboard" : "/patient-dashboard"); // ✅ Redirect to Home on Success
      }
    } catch (err) {
      console.log("This has a error")
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  }


  return (
    <Container maxWidth={false} disableGutters sx={{ overflow: "hidden" }}>
      <Stack  direction={isMobile ? "column" : "row"} height="100vh">
        
          <GradientPaper elevation={0} square>
            <FormContainer>
              <ToggleContainer>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {isInsurer ? "Hey Insurer, Welcome back! Login to your Insurer Account" : "Login to Patient Account"}
                </Typography>
                <Switch
                  checked={isInsurer}
                  onChange={() => setIsInsurer(!isInsurer)}
                  color="primary"
                />
              </ToggleContainer>

              <form onSubmit={handleSubmit}>
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
                  
                />

                

                <SignInButton 
                onClick={()=>{console.log("clicked")}} 
                type="submit" fullWidth variant="contained" size="large">
                  Sign in
                </SignInButton>
                {!isInsurer &&  <p>Didn't Have a Patient account  <Link
                  component="button"
                  variant="body2"
                  onClick={()=>{
                    navigate('/register')
                  }} 
                  sx={{ color: "#0ABCF9", cursor: "pointer", fontWeight: "bold" }}>SignUp </Link>
                    
                </p>}
                
                
                
              </form>
            </FormContainer>
          </GradientPaper>
        

        {!isMobile && (
          <Box item md={6}>
            <ImageContainer>
              <Box
                component="img"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-11-27%20181616%201-XZ2GCctiI7XUilK8IEX9Xv61kM4bB3.png"
                alt="Person with smartphone illustration"
                sx={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
              />
            </ImageContainer>
          </Box>
        )}
      </Stack>
    </Container>
  )
}
