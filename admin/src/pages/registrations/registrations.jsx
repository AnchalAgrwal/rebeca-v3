import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { PageContainer } from "@toolpad/core/PageContainer";
import {
    Box, Button, Typography, CircularProgress, Alert,
    Select, MenuItem, FormControl, InputLabel,
    useMediaQuery, useTheme, Divider
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import RegistrationCard from "../../components/RegistrationCard/RegistrationCard";
import RegistrationSearch from "../../components/RegistrationSearch/RegistrationSearch";
import { buildRegistrationColumns } from "../../components/RegistrationColumns/RegistrationColumns";
import { exportRegistrations } from "../../utils/exportToExcel";
import { useData } from "../../DataContext";

const matchesSearch = (row, query) => {
    if (!query.trim()) return true;
    return row.searchIndex?.includes(query.toLowerCase());
};

const Registrations = () => {
    const { registrations: allRows, loading, error, refresh } = useData();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const selectedEvent = searchParams.get("event") || "All";

    const sortedRows = useMemo(() =>
        [...allRows].sort((a, b) => a.event.localeCompare(b.event)),
        [allRows]
    );

    const eventNames = ["All", ...Array.from(new Set(allRows.map((r) => r.event))).sort()];

    const filteredRows = useMemo(() => {
        const byEvent = selectedEvent === "All"
            ? sortedRows
            : sortedRows.filter((r) => r.event === selectedEvent);
        return byEvent.filter((r) => matchesSearch(r, debouncedQuery));
    }, [sortedRows, selectedEvent, debouncedQuery]);

    const columns = useMemo(() =>
        buildRegistrationColumns(filteredRows, selectedEvent),
        [filteredRows, selectedEvent]
    );

    const getRowHeight = (params) => {
        const row = params.model;
        if (row.isTeam && row.teamMem?.length > 0) {
            return Math.max(52, (1 + row.teamMem.length) * 32 + 24);
        }
        return 52;
    };

    const handleEventSelect = (eventName) => {
        setSearchQuery("");
        eventName === "All" ? setSearchParams({}) : setSearchParams({ event: eventName });
    };

    return (
        <PageContainer title="">
            {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    {/* Event selector */}
                    <FormControl size="small" sx={{ width: isMobile ? "100%" : 200 }}>
                        <InputLabel>Event</InputLabel>
                        <Select
                            value={selectedEvent}
                            label="Event"
                            onChange={(e) => handleEventSelect(e.target.value)}
                        >
                            {eventNames.map((name) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Divider />

                    {/* Action bar */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            {filteredRows.length} registration{filteredRows.length !== 1 ? "s" : ""}
                            {selectedEvent !== "All" && ` · ${selectedEvent}`}
                            {debouncedQuery.trim() && ` · "${debouncedQuery}"`}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: isMobile ? "100%" : "auto", flexWrap: "wrap" }}>
                            <RegistrationSearch
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<RefreshIcon />}
                                onClick={refresh}
                                fullWidth={isMobile}
                                sx={{ whiteSpace: "nowrap" }}
                            >
                                Refresh
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<DownloadIcon />}
                                onClick={() => exportRegistrations(filteredRows, selectedEvent)}
                                disabled={filteredRows.length === 0}
                                fullWidth={isMobile}
                                sx={{ whiteSpace: "nowrap" }}
                            >
                                {isMobile ? "Download" : "Download Excel"}
                            </Button>
                        </Box>
                    </Box>

                    {/* Mobile — cards */}
                    {isMobile && filteredRows.map((row) => (
                        <RegistrationCard key={row.id} row={row} />
                    ))}

                    {/* Desktop — DataGrid */}
                    {!isMobile && (
                        <Box sx={{ width: "100%" }}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowHeight={getRowHeight}
                                getRowSpacing={() => ({ top: 2, bottom: 2 })}
                                pageSizeOptions={[10, 25, 50]}
                                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                                disableRowSelectionOnClick
                                autoHeight
                                sx={{
                                    "& .MuiDataGrid-cell": {
                                        alignItems: "center",
                                        display: "flex",
                                    }
                                }}
                            />
                        </Box>
                    )}
                </Box>
            )}
        </PageContainer>
    );
};

export default Registrations;