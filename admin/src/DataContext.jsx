import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllRegistrations } from "./utils/api";
import { SAMPLE_REGISTRATIONS } from "./utils/sampleData";

const DataContext = createContext();

const formatEventName = (slug) =>
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const buildSearchIndex = (reg) =>
    [
        reg.participantName,
        reg.teamName,
        ...(reg.teamMem?.map((m) => m.name) || []),
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

export const DataProvider = ({ children }) => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getAllRegistrations();
            const regs = res.data.data.regs;
            setRegistrations(regs.map((reg) => {
                const mapped = {
                    id: reg._id,
                    participantName: reg.userId?.name || "N/A",
                    participantEmail: reg.userId?.email || "N/A",
                    participantPhone: reg.userId?.phone || "—",
                    event: formatEventName(reg.event),
                    teamName: reg.teamName?.trim() || "—",
                    teamMem: reg.teamMem?.map((m) => ({
                        name: m.name,
                        phone: m.phone,
                    })) || [],
                    isTeam: reg.teamMem?.length > 0,
                    assetUpload: reg.assetUpload?.trim() || "",
                    paymentSS: reg.paymentSS?.trim() || "",
                    registeredAt: new Date(reg.createdAt).toLocaleDateString("en-IN"),
                };
                mapped.searchIndex = buildSearchIndex(mapped);
                return mapped;
            }));
        } catch {
            setError("Could not reach server. Showing sample data.");
            setRegistrations(
                SAMPLE_REGISTRATIONS.map((reg) => ({
                    ...reg,
                    searchIndex: buildSearchIndex(reg),
                }))
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ registrations, loading, error, refresh: fetchData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);