import React from "react";
import { Box, Typography, Link } from "@mui/material";
import AssetLink from "../AssetLink/AssetLink";

const StackedCell = ({ lines }) => (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 0.75,
        py: 1,
        height: "100%",
    }}>
        {lines.map((line, i) => (
            <Typography key={i} variant="body2" sx={{ lineHeight: 1.4 }}>
                {line || "—"}
            </Typography>
        ))}
    </Box>
);

export const buildRegistrationColumns = (rows, selectedEvent) => {
    const hasAsset = rows.some((r) => r.assetUpload && r.assetUpload.trim() !== "");
    const hasPayment = rows.some((r) => r.paymentSS && r.paymentSS.trim() !== "");
    const showEvent = selectedEvent === "All";

    const columns = [];

    if (showEvent) {
        columns.push({
            field: "event",
            headerName: "Event",
            width: 160,
        });
    }

    columns.push({
        field: "participantName",
        headerName: "Participant(s)",
        width: 200,
        renderCell: (params) => {
            const row = params.row;
            if (row.isTeam && row.teamMem?.length > 0) {
                return <StackedCell lines={[row.participantName, ...row.teamMem.map((m) => m.name)]} />;
            }
            return <Typography variant="body2">{row.participantName}</Typography>;
        },
    });

    columns.push({
        field: "participantPhone",
        headerName: "Contact(s)",
        width: 160,
        renderCell: (params) => {
            const row = params.row;
            if (row.isTeam && row.teamMem?.length > 0) {
                return <StackedCell lines={[row.participantPhone, ...row.teamMem.map((m) => m.phone)]} />;
            }
            return <Typography variant="body2">{row.participantPhone}</Typography>;
        },
    });

    columns.push({
        field: "teamName",
        headerName: "Team Name",
        width: 150,
    });

    if (hasAsset) {
        columns.push({
            field: "assetUpload",
            headerName: "Asset",
            width: 120,
            renderCell: (params) => <AssetLink url={params.row.assetUpload} />,
        });
    }

    if (hasPayment) {
        columns.push({
            field: "paymentSS",
            headerName: "Payment",
            width: 120,
            renderCell: (params) => {
                const url = params.row.paymentSS;
                if (!url || url.trim() === "") {
                    return <Typography variant="body2" color="text.secondary">—</Typography>;
                }
                return (
                    <Link href={url} target="_blank" rel="noopener noreferrer" underline="hover" variant="body2">
                        View
                    </Link>
                );
            },
        });
    }

    columns.push({
        field: "registeredAt",
        headerName: "Registered At",
        width: 130,
    });

    return columns;
};