import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

const StatCard = ({ icon, label, value, color, onClick }) => (
    <Card
        variant="outlined"
        onClick={onClick}
        sx={{
            flex: 1,
            minWidth: 140,
            cursor: onClick ? "pointer" : "default",
            transition: "border-color 0.15s, box-shadow 0.15s",
            "&:hover": onClick ? {
                borderColor: color || "primary.main",
                boxShadow: "0 0 0 1px",
                boxShadowColor: color || "primary.main",
            } : {},
        }}
    >
        <CardContent sx={{
            p: 3,
            "&:last-child": { pb: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 1,
        }}>
            <Box sx={{ color: color || "primary.main", display: "flex" }}>
                {icon}
            </Box>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="h4" fontWeight={700}>
                {value}
            </Typography>
        </CardContent>
    </Card>
);

export default StatCard;