import React, { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import { checkAuthStatus, logoutAdmin, loginWithGoogle, verifyPasskey } from "./utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [passkeyVerified, setPasskeyVerified] = useState(false);

    // On app load, restore session if both JWT cookie and passkey verification exist
    useEffect(() => {
        const initAuth = async () => {
            setLoading(true);
            try {
                const res = await checkAuthStatus();
                const loggedInUser = res.data.data.user;

                if (res.data.status === "success" && loggedInUser.email.endsWith("iiests.ac.in")) {
                    setUser(loggedInUser);
                    // Restore passkey verification across page refreshes
                    if (sessionStorage.getItem("passkey_verified") === "true") {
                        setPasskeyVerified(true);
                    }
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const handleLoginSuccess = async (response) => {
        setLoading(true);
        try {
            const res = await loginWithGoogle(response.credential);
            const loggedInUser = res.data.data.user;

            if (!loggedInUser.email.endsWith("iiests.ac.in")) {
                showAlert("Only IIESTians are allowed!", "warning");
                return;
            }

            setUser(loggedInUser);
            showAlert("Google login successful! Now enter the passkey.", "info");
        } catch (err) {
            console.error("Login Failed:", err.response?.data || err.message);
            showAlert("Login failed. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handlePasskeySubmit = async (passkey) => {
        const res = await verifyPasskey(passkey);
        if (res.data.status === "success") {
            sessionStorage.setItem("passkey_verified", "true");
            setPasskeyVerified(true);
            showAlert("Welcome to the dashboard!", "success");
        } else {
            throw new Error("Invalid passkey.");
        }
    };

    const handleLogout = async () => {
        try {
            await logoutAdmin();
            googleLogout();
            setUser(null);
            setPasskeyVerified(false);
            sessionStorage.removeItem("passkey_verified");
            showAlert("Logged out successfully", "success");
        } catch (err) {
            console.error("Logout failed:", err);
            showAlert("Logout failed", "error");
        }
    };

    const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });
    const showAlert = (message, severity = "info") => setAlert({ open: true, message, severity });
    const handleClose = () => setAlert((a) => ({ ...a, open: false }));

    return (
        <AuthContext.Provider value={{ user, loading, passkeyVerified, handleLoginSuccess, handlePasskeySubmit, handleLogout, showAlert }}>
            {children}
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleClose} severity={alert.severity} variant="filled">
                    {alert.message}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);