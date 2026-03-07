import React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import StatCard from "../../components/StatCard/StatCard";
import { useData } from "../../DataContext";
import { useNavigate } from "react-router";

const Admin = () => {
    const { registrations, loading } = useData();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const totalPeople = registrations.reduce((sum, r) => {
        return sum + 1 + (r.teamMem?.length || 0);
    }, 0);

    const stats = {
        totalPeople,
        uniqueEvents: new Set(registrations.map((r) => r.event)).size,
    };

    return (
        <PageContainer title="">
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 2,
                }}>
                    <StatCard
                        icon={<EventIcon />}
                        label="Total Events"
                        value={stats.uniqueEvents}
                        color="secondary.main"
                        onClick={() => navigate("/events")}
                    />
                    <StatCard
                        icon={<PeopleIcon />}
                        label="Total Participants"
                        value={stats.totalPeople}
                        color="primary.main"
                        onClick={() => navigate("/registrations")}
                    />
                </Box>
            )}
        </PageContainer>
    );
};

export default Admin;