import React from "react";
import { Card, CardContent, Box, Typography, Chip, Divider, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AssetLink from "../AssetLink/AssetLink";

const RegistrationCard = ({ row }) => (
    <Card variant="outlined" sx={{ mb: 1.5 }}>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>

            {/* Header — name and solo/team badge */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {row.isTeam ? row.teamName : row.participantName}
                    </Typography>
                    {!row.isTeam && (
                        <Typography variant="body2" color="text.secondary">{row.participantEmail}</Typography>
                    )}
                </Box>
                <Chip
                    size="small"
                    icon={row.isTeam ? <GroupIcon /> : <PersonIcon />}
                    label={row.isTeam ? "Team" : "Solo"}
                    color={row.isTeam ? "primary" : "default"}
                    variant="outlined"
                />
            </Box>

            {/* Solo — contact */}
            {!row.isTeam && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {row.participantPhone !== "—" ? `📞 ${row.participantPhone}` : "No contact"}
                </Typography>
            )}

            {/* Team — member list */}
            {row.isTeam && row.teamMem?.length > 0 && (
                <>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                        MEMBERS
                    </Typography>
                    {[{ name: row.participantName, phone: row.participantPhone }, ...row.teamMem].map((member, i) => (
                        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="body2">{member.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{member.phone}</Typography>
                        </Box>
                    ))}
                </>
            )}

            <Divider sx={{ my: 1 }} />

            {/* Asset and Payment */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}>
                {row.assetUpload && row.assetUpload.trim() !== "" && (
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                            ASSET
                        </Typography>
                        <AssetLink url={row.assetUpload} />
                    </Box>
                )}
                {row.paymentSS && row.paymentSS.trim() !== "" && (
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                            PAYMENT
                        </Typography>
                        <Link href={row.paymentSS} target="_blank" rel="noopener noreferrer" underline="hover" variant="body2">
                            View
                        </Link>
                    </Box>
                )}
            </Box>

            {/* Registered At */}
            <Typography variant="caption" color="text.secondary">
                Registered: {row.registeredAt}
            </Typography>

        </CardContent>
    </Card>
);

export default RegistrationCard;