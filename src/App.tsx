import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIHumanReasoning from "./pages/articles/AIHumanReasoning";
import VisionModels from "./pages/articles/VisionModels";
import NeuralNetworks from "./pages/articles/NeuralNetworks";
import DeepLearningTrends from "./pages/articles/DeepLearningTrends";
import AIRegulations from "./pages/articles/AIRegulations";
import AILawEnforcement from "./pages/articles/AILawEnforcement";
import AIEthics from "./pages/articles/AIEthics";
import QuantumML from "./pages/articles/QuantumML";
import RLBreakthrough from "./pages/articles/RLBreakthrough";
import AIResearchTrends from "./pages/articles/AIResearchTrends";
import AIManufacturing from "./pages/articles/AIManufacturing";
import AIAgriculture from "./pages/articles/AIAgriculture";
import AIRetail from "./pages/articles/AIRetail";
import AutoMLAdoption from "./pages/articles/AutoMLAdoption";
import NewTrainingMethods from "./pages/articles/NewTrainingMethods";
import LanguageModels from "./pages/articles/LanguageModels";
import AIHealthcare from "./pages/articles/AIHealthcare";
import TensorFlow3 from "./pages/articles/TensorFlow3";
import AIStartups from "./pages/articles/AIStartups";
import BenchmarkDataset from "./pages/articles/BenchmarkDataset";
import ICMLKeynotes from "./pages/articles/ICMLKeynotes";
import AIEducation from "./pages/articles/AIEducation";
import LearningCurves from "./pages/articles/LearningCurves";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/articles/ai-human-reasoning"
              element={
                <div>
                  <h1>Debug: AI Human Reasoning Route</h1>
                  <AIHumanReasoning />
                </div>
              }
            />
            <Route path="/articles/vision-models" element={<VisionModels />} />
            <Route path="/articles/neural-networks" element={<NeuralNetworks />} />
            <Route path="/articles/deep-learning-trends" element={<DeepLearningTrends />} />
            <Route path="/articles/ai-regulations" element={<AIRegulations />} />
            <Route path="/articles/ai-law-enforcement" element={<AILawEnforcement />} />
            <Route path="/articles/ai-ethics" element={<AIEthics />} />
            <Route path="/articles/quantum-ml" element={<QuantumML />} />
            <Route path="/articles/rl-breakthrough" element={<RLBreakthrough />} />
            <Route path="/articles/ai-research-trends" element={<AIResearchTrends />} />
            <Route path="/articles/ai-manufacturing" element={<AIManufacturing />} />
            <Route path="/articles/ai-agriculture" element={<AIAgriculture />} />
            <Route path="/articles/ai-retail" element={<AIRetail />} />
            <Route path="/articles/automl-adoption" element={<AutoMLAdoption />} />
            <Route path="/articles/new-training-methods" element={<NewTrainingMethods />} />
            <Route path="/articles/language-models" element={<LanguageModels />} />
            <Route path="/articles/ai-healthcare" element={<AIHealthcare />} />
            <Route path="/articles/tensorflow-3" element={<TensorFlow3 />} />
            <Route path="/articles/ai-startups" element={<AIStartups />} />
            <Route path="/articles/benchmark-dataset" element={<BenchmarkDataset />} />
            <Route path="/articles/icml-keynotes" element={<ICMLKeynotes />} />
            <Route path="/articles/ai-education" element={<AIEducation />} />
            <Route path="/articles/learning-curves" element={<LearningCurves />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
