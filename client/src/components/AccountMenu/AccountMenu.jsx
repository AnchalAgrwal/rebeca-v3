import * as React from "react";
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Badge,
    Tooltip,
    Alert,
    Chip,
    Typography,
    CircularProgress,
} from "@mui/material";
import {
    PersonAdd,
    Settings,
    Logout,
    Login,
    Google,
    Person,
    Warning,
    LoginRounded,
    ArrowRight,
} from "@mui/icons-material";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { GoogleLogin } from "@react-oauth/google";

import "./AccountMenu.css";

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, handleLoginSuccess, handleLogout, userLoad, setUserLoad } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = (response) => {
        handleLoginSuccess(response);
        // Navigate to home after successful login
        setTimeout(() => navigate("/"), 500);
    };

    return user ? (
        <Avatar
            sx={{ width: 32, height: 32 }}
            src={user.picture || user.photoURL} // Handle common Google user object fields
            alt={user.name}
        >
            {/* Fallback to first letter of name if no image */}
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </Avatar>
    ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin onSuccess={handleSuccess} onError={() => console.error("Login Failed")} disabled={userLoad} />
        </Box>
    );
}
