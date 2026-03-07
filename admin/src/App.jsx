import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { useAuth } from "./AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { useMemo } from "react";
import EventIcon from '@mui/icons-material/Event';
import "./App.css";

const NAVIGATION = [
    {
        kind: "header",
        title: "Navigation",
    },
    {
        segment: "admin",
        title: "Admin",
        icon: <DashboardIcon />,
    },
    {
        segment: "events",
        title: "Events",
        icon: <EventIcon />,
        pattern: "events{/:eventId}*",
    },
    {
        segment: "registrations",
        title: "Registrations",
        icon: <TableRowsIcon />,
    },
];

const BRANDING = {
    title: "Rebeca Admin",
};

export default function App() {
    const { handleLogout, user, loading, passkeyVerified } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const session = useMemo(() => (user ? {
        user: {
            name: user.name,
            email: user.email,
            image: user.image,
        }
    } : null), [user]);

    const handleLogoutClick = async () => {
        await handleLogout();
        navigate("/signin");
    };

    const authentication = useMemo(() => ({
        signIn: () => {},
        signOut: () => { handleLogoutClick(); },
    }), []);

    // Show loading screen while checking auth on app start
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    // Not logged in at all -> go to signin
    //This can be commented out for direct access to the dashboard 
    //From (A) here

    if (!user && location.pathname !== "/signin") {
        return <Navigate to="/signin" replace />;
    }

    // Logged in via Google but passkey not verified → go to signin (step 2)
    if (user && !passkeyVerified && location.pathname !== "/signin") {
        return <Navigate to="/signin" replace />;
    }

    //to (B) here

    // Fully authenticated but trying to access signin → go to dashboard
    if (user && passkeyVerified && location.pathname === "/signin") {
        return <Navigate to="/" replace />;
    }

    // On signin page -> just render the signin page with no Toolpad shell
    if (location.pathname === "/signin") {
        return <Outlet />;
    }

    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
            session={session}
            authentication={authentication}
        >
            <Outlet />
        </ReactRouterAppProvider>
    );
}