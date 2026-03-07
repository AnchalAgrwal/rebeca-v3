import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import App from "./App";
import Layout from "./layouts/dashboard";
import Admin from "./pages/admin/admin";
import Events from "./pages/events/events";
import Registrations from "./pages/registrations/registrations";
import SignIn from "./pages/signin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthContext";
import { DataProvider } from "./DataContext";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const ProtectedRouteLayout = () => (
    <Layout>
        <Outlet />
    </Layout>
);

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: "/signin",
                Component: SignIn,
            },
            {
                path: "/",
                Component: ProtectedRouteLayout,
                children: [
                    { path: "admin", Component: Admin },
                    { path: "events/", Component: Events },
                    { path: "registrations", Component: Registrations },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <React.StrictMode>
            <AuthProvider>
                <DataProvider>
                    <RouterProvider router={router} />
                </DataProvider>
            </AuthProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);