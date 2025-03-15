"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Link
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import axios from "axios"

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

const TableWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}))

const NewClaimButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#001e3c",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}))

export default function PatientDashboard() {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchClaims()
  }, [])

  // ✅ Fetch Claims for Logged-in Patient
  const fetchClaims = async () => {
    setLoading(true)
    setError("")

    // ✅ Get User Data from Local Storage
    const storedUser = localStorage.getItem("userId")
    if (!storedUser) {
      setError("User not found. Please log in.")
      setLoading(false)
      return
    }

    const user = JSON.parse(storedUser)
    const email = user.email // ✅ Get email from localStorage

    try {
      const response = await axios.get(`http://localhost:5000/api/claims/my-claims/${email}`)
      setClaims(response.data)
    } catch (err) {
      setError("Failed to fetch claims")
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="xl">
      <GradientPaper elevation={0} square>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            My Submitted Claims
          </Typography>
          <NewClaimButton variant="contained" onClick={() => navigate("/submit-claim")}>
            New Claim
          </NewClaimButton>
        </Box>

        {/* Error Message */}
        {error && (
          <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
            {error}
          </Typography>
        )}

        {/* Claims Table */}
        {loading ? (
          <CircularProgress />
        ) : claims.length > 0 ? (
          <TableWrapper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Claim Amount</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Document</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim._id}>
                      <TableCell>${claim.claimAmount}</TableCell>
                      <TableCell>{claim.description}</TableCell>
                      <TableCell>
                        {claim.imgUrl ? (
                          <Link href={claim.imgUrl} target="_blank" rel="noopener noreferrer">
                            View File
                          </Link>
                        ) : (
                          "No File"
                        )}
                      </TableCell>
                      <TableCell>{claim.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No Previous Claims Found
          </Typography>
        )}
      </GradientPaper>
    </Container>
  )
}
