import React, { useState } from "react";
import {
    Box, Button, Dialog, DialogContent, DialogTitle,
    IconButton, Typography
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

const isImageUrl = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return IMAGE_EXTENSIONS.some((ext) => lower.includes(ext));
};

const AssetLink = ({ url }) => {
    const [open, setOpen] = useState(false);

    if (!url || url.trim() === "") {
        return <Typography variant="body2" color="text.secondary">—</Typography>;
    }

    if (isImageUrl(url)) {
        return (
            <>
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ImageIcon fontSize="small" />}
                    onClick={() => setOpen(true)}
                    sx={{ whiteSpace: "nowrap" }}
                >
                    View
                </Button>

                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
                        <Typography variant="subtitle1">Asset</Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<OpenInNewIcon fontSize="small" />}
                                onClick={() => window.open(url, "_blank")}
                            >
                                Open
                            </Button>
                            <IconButton size="small" onClick={() => setOpen(false)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ p: 1 }}>
                        <Box
                            component="img"
                            src={url}
                            alt="Asset"
                            sx={{ width: "100%", height: "auto", borderRadius: 1 }}
                        />
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    // Drive link or any other URL — just open in new tab
    return (
        <Button
            size="small"
            variant="outlined"
            startIcon={<OpenInNewIcon fontSize="small" />}
            onClick={() => window.open(url, "_blank")}
            sx={{ whiteSpace: "nowrap" }}
        >
            View
        </Button>
    );
};

export default AssetLink;