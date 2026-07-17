import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import Inbox from "./Pages/Inbox";
import Lessons from "./Pages/Lessons";
import Tasks from "./Pages/Tasks";
import Groups from "./Pages/Groups";
import Settings from "./Pages/Settings";
import CoursesPage from "./Pages/Courses";
import ChatbotPage from "./Pages/ChatbotPage";
import HireFreelancerPage from "./Pages/HireFreelancerPage";
import Jobs from "./Pages/Jobs";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Redirect empty path to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Sub-routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/hire" element={<HireFreelancerPage />} />
        <Route path="/jobs" element={<Jobs />} />
      </Route>
    </Routes>
  );
}

export default App;
