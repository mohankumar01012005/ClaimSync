"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

// ✅ Initialize Supabase Client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY

)

// Custom styled components
const GradientPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(to bottom, #0a1929, #001e3c)",
  borderRadius: 0,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  color: "#fff",
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

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  backgroundColor: "#fff",
  color: "#001e3c",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}))

export default function ClaimForm() {
  const [user, setUser] = useState(null)
  const [claimAmount, setClaimAmount] = useState("")
  const [description, setDescription] = useState("")
  const [document, setDocument] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [imgUrl,setImgUrl]=useState("");

  useEffect(() => {
    // ✅ Load user from localStorage
    const storedUser = localStorage.getItem("userId")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      navigate("/login") // Redirect to login if no user found
    }
  }, [navigate])

  // ✅ Upload File to Supabase
  const uploadFileToSupabase = async (file) => {
    if (!user || !file) {
      setError("User not found or file missing!");
      return null;
    }
  
    const filePath = `${user.email}/${uuidv4()}_${file.name}`; // Unique filename
  
    console.log("Uploading to Supabase bucket: claimsync");
    console.log("File being uploaded:", file.name);
  
    // ✅ Upload File to Supabase Storage
    const { data, error } = await supabase.storage
      .from("claimsync") // Ensure the correct bucket name
      .upload(filePath, file, { cacheControl: "3600", upsert: false });
  
    if (error) {
      console.error("Upload Error:", error);
      setError("File upload failed!");
      return null;
    }
  
    // ✅ Get Public URL of the Uploaded File
    const { data: publicURL } = supabase.storage.from("claimsync").getPublicUrl(filePath);
  
    if (!publicURL) {
      console.error("Error generating file URL");
      return null;
    }
    setImgUrl(publicURL.publicUrl)
    console.log("File successfully uploaded to Supabase!");
    console.log("File URL:", publicURL.publicUrl); // ✅ Console log the file URL
  
    return publicURL.publicUrl;
  };
  



  // ✅ Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
  
    if (!user) {
      setError("User not found. Please log in.");
      return;
    }
  console.log("Img Url ",imgUrl)
    try {
      // ✅ Upload Document to Supabase and Get URL
      
  
      // ✅ Submit Claim Data to Backend
      await axios.post("http://localhost:5000/api/claims/submit", {
        name: user.name,
        email: user.email,
        claimAmount,
        description,
        imgUrl, // ✅ Send Supabase file URL to backend
      });
  
      navigate("/patient-dashboard"); // ✅ Redirect to dashboard after submission
    } catch (err) {
      setError("Failed to submit claim. Please try again.");
    }
  };
  

  return (
    <Container maxWidth="md">
      <GradientPaper elevation={0} square>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
          Submit a New Claim
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
          {error && <Typography color="error">{error}</Typography>}

          <StyledTextField fullWidth value={user?.name || ""} variant="outlined" label="Name" disabled />
          <StyledTextField fullWidth value={user?.email || ""} variant="outlined" label="Email" disabled />
          <StyledTextField fullWidth placeholder="Claim Amount" variant="outlined" type="number" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} required />
          <StyledTextField fullWidth placeholder="Description" variant="outlined" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="file" accept="image/*,application/pdf" onChange={(e) => uploadFileToSupabase(e.target.files[0])} required style={{ marginBottom: "16px", color: "#fff" }} />
          <SubmitButton  type="submit" fullWidth variant="contained">Submit Claim</SubmitButton>
        </Box>
      </GradientPaper>
    </Container>
  )
}
