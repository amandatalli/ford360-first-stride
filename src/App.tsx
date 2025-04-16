
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
import { supabase } from "@/integrations/supabase/client";

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
  // Check auth status using Supabase
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  // Auth state management with Supabase
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session with Supabase
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setUser(data.session.user);
          sessionStorage.setItem("isAuthenticated", "true");
        } else {
          const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
          if (isAuthenticated) {
            // If session storage says authenticated but no actual session, check again
            const { data: authData } = await supabase.auth.getUser();
            if (authData?.user) {
              setUser(authData.user);
            } else {
              sessionStorage.removeItem("isAuthenticated");
            }
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        sessionStorage.setItem("isAuthenticated", "true");
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        sessionStorage.removeItem("isAuthenticated");
      }
    });

    checkAuth();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
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
