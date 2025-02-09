import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LearningCurves from "./pages/articles/LearningCurves";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/articles/learning-curves" element={<LearningCurves />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
