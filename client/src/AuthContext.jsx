import React, { createContext, useContext, useState, useEffect } from "react";
import useNotification from "./hooks/useNotification";
import {
    AdminPanelSettings,
    AttachMoney,
    Palette,
    Event,
    Info,
    DirectionsBus,
    Handshake,
    Article,
    Campaign,
    Brush,
    Groups,
    Code,
    Restaurant,
    VolunteerActivism,
    CameraAlt,
    AssignmentInd,
    AccountBalance,
    MenuBook,
} from "@mui/icons-material";
const AuthContext = createContext();
import { loginWithGoogle, logoutUser, checkAuthStatus, getAllEvents, getAllTeams } from "./services/api";

export const skeleton = [
    { id: 1, team: "Secretary General", members: [], icon: <AdminPanelSettings /> },
    { id: 2, team: "Finance", members: [], icon: <AttachMoney /> },
    { id: 3, team: "Cultural", members: [], icon: <Palette /> },
    { id: 4, team: "Event", members: [], icon: <Event /> },
    { id: 5, team: "Resource Information", members: [], icon: <Info /> },
    { id: 6, team: "Travel & Logistics", members: [], icon: <DirectionsBus /> },
    { id: 7, team: "Sponsorship", members: [], icon: <Handshake /> },
    { id: 8, team: "Publication", members: [], icon: <Article /> },
    { id: 9, team: "Publicity", members: [], icon: <Campaign /> },
    { id: 10, team: "Stage Decoration", members: [], icon: <Brush /> },
    { id: 11, team: "Business & Alumni Meet", members: [], icon: <Groups /> },
    { id: 12, team: "Competition and Seminars", members: [], icon: <Code /> },
    { id: 13, team: "Web Development", members: [], icon: <Code /> },
    { id: 14, team: "Refreshments", members: [], icon: <Restaurant /> },
    { id: 15, team: "Volunteers", members: [], icon: <VolunteerActivism /> },
    { id: 16, team: "Photography", members: [], icon: <CameraAlt /> },
    { id: 17, team: "Joint Secretary", members: [], icon: <AssignmentInd /> },
    { id: 18, team: "Fixed Signatory", members: [], icon: <AccountBalance /> },
    { id: 19, team: "BECA Magazine", members: [], icon: <MenuBook /> },
];

const teamNameToId = {
    "Secretary General": 1,
    Finance: 2,
    Cultural: 3,
    Event: 4,
    "Resource Information": 5,
    "Travel & Logistics": 6,
    Sponsorship: 7,
    Publication: 8,
    Publicity: 9,
    "Stage Decoration": 10,
    "Business & Alumni Meet": 11,
    "Competition and Seminars": 12,
    "Web Development": 13,
    Refreshments: 14,
    Volunteers: 15,
    Photography: 16,
    "Joint Secretary": 17,
    "Fixed Signatory": 18,
    "BECA Magazine": 19,
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoad, setUserLoad] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [allTeams, setAllTeams] = useState([]);
    const [teamsData, setTeamsData] = useState(skeleton);
    const { Notification, showNotification } = useNotification();

    useEffect(() => {
        // load events
        try {
            const e = getAllEvents();
            setAllEvents(e);
            const t = getAllTeams();
            setAllTeams(t);
        } catch (err) {
            showNotification(`Err: ${err}`, 'error');
        }
        // check auth status
        const initAuth = async () => {
            setUserLoad(true);
            try {
                // This request automatically sends the 'jwt' cookie if it exists
                const res = await checkAuthStatus();
                console.log(res);

                if (res.data.status === "success") {
                    setUser(res.data.data.user);
                }
            } catch (err) {
                setUser(null);
                showNotification(`Err: ${err}`, 'error')
            } finally {
                setUserLoad(false);
            }
        };

        initAuth();
        console.log(allEvents);
        console.log(allTeams);
        console.log(user)
    }, []);

    const handleLoginSuccess = async (response) => {
        setLoading(true);
        try {
            const res = await loginWithGoogle(response.credential);
            setUser(res.data.data.user);
            showNotification("Login successful!", "success");
        } catch (err) {
            console.log("Login Failed on Backend:", err.response?.data || err.message);
            showNotification("Login failed. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutAdmin();
            googleLogout();
            setUser(null);
            localStorage.removeItem("session");
            showAlert("Logged out successfully", "success");
        } catch (err) {
            console.error("Logout failed:", err);
            showAlert("Logout failed", "error");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                handleLoginSuccess,
                handleLogout,
                allEvents,
                allTeams,
                setAllEvents,
                setAllTeams,
                userLoad,
                setUserLoad,
                showNotification
            }}
        >
            <Notification />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
