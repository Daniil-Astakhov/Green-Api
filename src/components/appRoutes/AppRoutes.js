import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../welcomePage/Welcome";
import Chat from "../chatPage/Chat";

const AppRoutes = () => (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
);
export default AppRoutes;