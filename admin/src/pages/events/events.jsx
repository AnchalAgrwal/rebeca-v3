import React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import EventCard from "../../components/EventCard/EventCard";
import { useData } from "../../DataContext";

const Events = () => {
    const { registrations, loading } = useData();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const events = Array.from(
        registrations.reduce((map, r) => {
            if (!map.has(r.event)) map.set(r.event, { totalPeople: 0, teamCount: 0, soloCount: 0 });
            const e = map.get(r.event);

            // Count userId (submitter) + all teamMem as people
            const peopleInThisReg = 1 + (r.teamMem?.length || 0);
            e.totalPeople += peopleInThisReg;

            if (r.isTeam) e.teamCount++;
            else e.soloCount++;

            return map;
        }, new Map())
    )
        .map(([name, counts]) => ({ name, ...counts }))
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <PageContainer title="">
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <CircularProgress />
                </Box>
            ) : events.length === 0 ? (
                <Typography color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
                    No registrations yet.
                </Typography>
            ) : (
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 2,
                }}>
                    {events.map((event) => (
                        <EventCard
                            key={event.name}
                            name={event.name}
                            total={event.totalPeople}
                            teamCount={event.teamCount}
                            soloCount={event.soloCount}
                            onClick={() => navigate(`/registrations?event=${encodeURIComponent(event.name)}`)}
                        />
                    ))}
                </Box>
            )}
        </PageContainer>
    );
};

export default Events;