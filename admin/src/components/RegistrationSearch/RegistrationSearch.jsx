import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const RegistrationSearch = ({ value, onChange }) => (
    <TextField
        size="small"
        placeholder="Search participants..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
            input: {
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
            },
        }}
        sx={{ width: 220 }}
    />
);

export default RegistrationSearch;