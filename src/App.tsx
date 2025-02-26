
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { NotFound } from "./pages/NotFound";
import { CreateArticle } from "./pages/CreateArticle";
import { Auth } from "./pages/Auth";
import { DynamicArticle } from "./pages/articles/DynamicArticle";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/articles/:id" element={<DynamicArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
