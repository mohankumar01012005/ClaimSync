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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// ✅ Custom Styled Components
const GradientPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(to bottom, #0a1929, #001e3c)", // Professional Gradient
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

const ActionButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  "&:hover": {
    opacity: 0.9,
  },
}))

export default function InsurerDashboard() {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  // ✅ Fetch All Claims
  useEffect(() => {
    fetchClaims()
  }, [])

  const fetchClaims = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.get("http://localhost:5000/api/claims/all-claims") // Fetch All Claims
      setClaims(response.data)
    } catch (err) {
      setError("Failed to fetch claims")
    }
    setLoading(false)
  }

  // ✅ Handle View Details
  const handleViewDetails = (claim) => {
    setSelectedClaim(claim)
    setOpenModal(true)
  }

  // ✅ Handle Close Modal
  const handleCloseModal = () => {
    setSelectedClaim(null)
    setOpenModal(false)
  }

  // ✅ Handle Approve / Reject Claim
  const handleUpdateClaim = async (status) => {
    if (!selectedClaim) return
    try {
      await axios.put(`http://localhost:5000/api/claims/update/${selectedClaim._id}`, {
        status,
        approvedAmount: status === "Approved" ? selectedClaim.claimAmount : 0,
        insurerComments: status === "Rejected" ? "Claim rejected due to policy terms." : "Claim approved successfully.",
      })

      // ✅ Update UI Immediately
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === selectedClaim._id ? { ...claim, status } : claim
        )
      )

      handleCloseModal()
    } catch (err) {
      console.error("Failed to update claim:", err)
      setError("Failed to update claim")
    }
  }

  return (
    <Container maxWidth="xl">
      <GradientPaper elevation={0} square>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Insurer Claims Dashboard
          </Typography>
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
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim._id}>
                      <TableCell>{claim.name}</TableCell>
                      <TableCell>{claim.email}</TableCell>
                      <TableCell>{new Date(claim.submissionDate).toLocaleDateString()}</TableCell>
                      <TableCell>{claim.status}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleViewDetails(claim)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No Claims Found
          </Typography>
        )}

        {/* ✅ Claim Details Modal */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
            Claim Details
          </DialogTitle>
          <DialogContent>
            {selectedClaim && (
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6"><strong>Name:</strong> {selectedClaim.name}</Typography>
                  <Typography variant="h6"><strong>Email:</strong> {selectedClaim.email}</Typography>
                  <Typography variant="h6"><strong>Date:</strong> {new Date(selectedClaim.submissionDate).toLocaleDateString()}</Typography>
                  <Typography variant="h6"><strong>Amount:</strong> ${selectedClaim.claimAmount}</Typography>
                  <Typography variant="h6"><strong>Description:</strong> {selectedClaim.description}</Typography>
                  <Typography variant="h6"><strong>Status:</strong> {selectedClaim.status}</Typography>
                  
                  {/* ✅ File Link */}
                  {selectedClaim.imgUrl && (
                    <Box mt={2}>
                      <Typography variant="h6"><strong>Document:</strong></Typography>
                      <a href={selectedClaim.imgUrl} target="_blank" rel="noopener noreferrer">
                        View Uploaded File
                      </a>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </DialogContent>
          <DialogActions>
            {selectedClaim && selectedClaim.status === "Pending" ? (
              <>
                <ActionButton variant="contained" color="success" onClick={() => handleUpdateClaim("Approved")}>
                  Approve
                </ActionButton>
                <ActionButton variant="contained" color="error" onClick={() => handleUpdateClaim("Rejected")}>
                  Reject
                </ActionButton>
              </>
            ) : (
              <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
                Status: {selectedClaim?.status}
              </Typography>
            )}
            <Button onClick={handleCloseModal} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </GradientPaper>
    </Container>
  )
}
