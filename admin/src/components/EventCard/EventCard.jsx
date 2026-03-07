import React from "react";
import {
    Card, CardActionArea, CardContent, Box,
    Typography, Chip, Divider, Avatar
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const EventCard = ({ name, total, teamCount, soloCount, onClick }) => (
    <Card variant="outlined" sx={{ mb: 1.5 }}>
        <CardActionArea onClick={onClick}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                            <EventIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight={600}>{name}</Typography>
                    </Box>
                    <ArrowForwardIcon fontSize="small" color="action" />
                </Box>
                <Divider sx={{ mb: 1.5 }} />
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                        icon={<PeopleIcon fontSize="small" />}
                        label={`${total} registered`}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                    {teamCount > 0 && (
                        <Chip
                            icon={<GroupsIcon fontSize="small" />}
                            label={`${teamCount} teams`}
                            size="small"
                            color="success"
                            variant="outlined"
                        />
                    )}
                    {soloCount > 0 && (
                        <Chip
                            icon={<PersonIcon fontSize="small" />}
                            label={`${soloCount} solo`}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>
            </CardContent>
        </CardActionArea>
    </Card>
);

export default EventCard;