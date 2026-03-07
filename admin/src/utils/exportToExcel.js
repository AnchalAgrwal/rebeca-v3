import * as XLSX from "xlsx";

const buildSoloRows = (rows, includeEvent) =>
    rows
        .filter((r) => !r.isTeam)
        .map((r) => ({
            ...(includeEvent && { Event: r.event }),
            Participant: r.participantName,
            Email: r.participantEmail,
            Phone: r.participantPhone,
            ...(r.assetUpload && { Asset: r.assetUpload }),
            ...(r.paymentSS && { Payment: r.paymentSS }),
            "Registered At": r.registeredAt,
        }));

const buildTeamRows = (rows, includeEvent) => {
    // Find max team size across all team registrations to fix column count
    const maxMembers = rows
        .filter((r) => r.isTeam)
        .reduce((max, r) => Math.max(max, 1 + (r.teamMem?.length || 0)), 0);

    return rows
        .filter((r) => r.isTeam)
        .map((r) => {
            const allMembers = [
                { name: r.participantName, phone: r.participantPhone },
                ...(r.teamMem || []),
            ];

            const row = {
                ...(includeEvent && { Event: r.event }),
                "Team Name": r.teamName,
            };

            // Fill member columns up to maxMembers so all rows have same columns
            for (let i = 0; i < maxMembers; i++) {
                row[`Member ${i + 1}`] = allMembers[i]?.name || "";
                row[`Member ${i + 1} Phone`] = allMembers[i]?.phone || "";
            }

            if (r.assetUpload) row["Asset"] = r.assetUpload;
            if (r.paymentSS) row["Payment"] = r.paymentSS;
            row["Registered At"] = r.registeredAt;

            return row;
        });
};

export const exportRegistrations = (filteredRows, selectedEvent) => {
    const isAll = selectedEvent === "All";
    const workbook = XLSX.utils.book_new();

    if (isAll) {
        // Two sheets — one for solo, one for teams
        const soloRows = buildSoloRows(filteredRows, true);
        const teamRows = buildTeamRows(filteredRows, true);

        if (soloRows.length > 0) {
            XLSX.utils.book_append_sheet(
                workbook,
                XLSX.utils.json_to_sheet(soloRows),
                "Solo Registrations"
            );
        }

        if (teamRows.length > 0) {
            XLSX.utils.book_append_sheet(
                workbook,
                XLSX.utils.json_to_sheet(teamRows),
                "Team Registrations"
            );
        }

        XLSX.writeFile(workbook, "Rebeca_All_Registrations.xlsx");
    } else {
        // Single event — detect if solo or team event based on rows
        const hasTeams = filteredRows.some((r) => r.isTeam);
        const hasSolo = filteredRows.some((r) => !r.isTeam);

        if (hasTeams && hasSolo) {
            // Mixed event — two sheets
            const soloRows = buildSoloRows(filteredRows, false);
            const teamRows = buildTeamRows(filteredRows, false);

            if (soloRows.length > 0) {
                XLSX.utils.book_append_sheet(
                    workbook,
                    XLSX.utils.json_to_sheet(soloRows),
                    "Solo"
                );
            }
            if (teamRows.length > 0) {
                XLSX.utils.book_append_sheet(
                    workbook,
                    XLSX.utils.json_to_sheet(teamRows),
                    "Teams"
                );
            }
        } else if (hasTeams) {
            const teamRows = buildTeamRows(filteredRows, false);
            XLSX.utils.book_append_sheet(
                workbook,
                XLSX.utils.json_to_sheet(teamRows),
                "Registrations"
            );
        } else {
            const soloRows = buildSoloRows(filteredRows, false);
            XLSX.utils.book_append_sheet(
                workbook,
                XLSX.utils.json_to_sheet(soloRows),
                "Registrations"
            );
        }

        XLSX.writeFile(workbook, `Rebeca_${selectedEvent}_Registrations.xlsx`);
    }
};