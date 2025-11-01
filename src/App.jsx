import React from "react";
import AppRoutes from "./Routes"; // renamed to avoid confusion
import "./testSupabase.js"; // for connection test
import { AuthProvider } from "./contexts/AuthContext";

// ✅ Debug logs for environment variables
console.log("🔍 VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("🔍 VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
