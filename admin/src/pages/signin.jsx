import React, { useState } from "react";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { Box, Container, Paper, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "../AuthContext";

const SignIn = () => {
    const { handleLoginSuccess, handlePasskeySubmit, loading, user, passkeyVerified } = useAuth();
    const navigate = useNavigate();
    const [passkey, setPasskey] = useState("");
    const [error, setError] = useState("");
    const [passkeyLoading, setPasskeyLoading] = useState(false);

    const handleGoogleSuccess = async (response) => {
        setError("");
        await handleLoginSuccess(response);
    };

    const handlePasskeyEntry = async (e) => {
        e.preventDefault();
        setError("");
        setPasskeyLoading(true);
        try {
            await handlePasskeySubmit(passkey);
            navigate("/");
        } catch (err) {
            setError(err.message || "Invalid passkey. Try again.");
        } finally {
            setPasskeyLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>

                    {/* STEP 1 — Google Login */}
                    {!user && (
                        <>
                            <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
                                Rebeca Admin
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}>
                                Sign in with your college Google account
                            </Typography>
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                {loading ? <CircularProgress /> : (
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={() => setError("Google sign-in failed. Try again.")}
                                    />
                                )}
                            </Box>
                        </>
                    )}

                    {/* STEP 2 — Passkey */}
                    {user && !passkeyVerified && (
                        <>
                            <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
                                Enter Passkey
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}>
                                Welcome, {user.name}. Enter the coordinator passkey to continue.
                            </Typography>
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            <form onSubmit={handlePasskeyEntry}>
                                <TextField
                                    fullWidth
                                    label="Passkey"
                                    type="password"
                                    value={passkey}
                                    onChange={(e) => setPasskey(e.target.value)}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={passkeyLoading}
                                    sx={{ py: 1.5 }}
                                >
                                    {passkeyLoading ? <CircularProgress size={24} color="inherit" /> : "Enter Dashboard"}
                                </Button>
                            </form>
                        </>
                    )}

                </Paper>
            </Box>
        </Container>
    );
};

export default SignIn;