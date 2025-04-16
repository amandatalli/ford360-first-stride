import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useEffect, createContext, useState } from "react";

// This is a placeholder for Supabase authentication context
// Will be properly implemented when Supabase is connected
type AuthContextType = {
  user: any | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

const queryClient = new QueryClient();

// Private Route component - redirects to login if user is not authenticated
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  // This is a placeholder - will check actual auth status when Supabase is integrated
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  // Placeholder for auth state management - will be replaced with Supabase
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with actual Supabase auth check
    const checkAuth = async () => {
      try {
        const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
        if (isAuthenticated) {
          setUser({ id: "placeholder" });
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
