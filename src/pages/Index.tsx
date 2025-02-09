import { NewsHeader } from "@/components/NewsHeader";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto pl-0">
          {/* Main Headline */}
          <div className="border-b-2 border-black py-6">
            <span className="text-xs font-bold uppercase tracking-wider">Breaking News</span>
            <Link to="/articles/ai-human-reasoning" className="group">
              <h1 className="font-serif text-7xl text-black mt-2 mb-6 leading-none group-hover:text-gray-800">
                AI Models Achieve Human-Level Reasoning
              </h1>
              <div className="text-xl font-serif leading-relaxed group-hover:text-gray-700">
                Researchers demonstrate breakthrough in cognitive capabilities, marking a historic milestone in artificial intelligence development. This advancement opens new possibilities for AI applications across various fields.
              </div>
              <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                Continue Reading →
              </span>
            </Link>
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-6 gap-6 mt-6">
            {/* Column 1 */}
            <div className="col-span-2 border-r border-gray-300 pr-6">
              <h2 className="font-serif text-3xl mb-4">Deep Learning</h2>
              <div className="space-y-6">
                <article>
                  <Link to="/articles/vision-models" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Vision Models Surpass Expert Performance
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      Recent advancements in vision models have led to unprecedented accuracy in medical imaging, surpassing human experts. This breakthrough promises to revolutionize diagnostics and treatment planning.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/neural-networks" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Neural Networks Scale New Heights
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      The development of a 1 trillion parameter model has shown emergent abilities, pushing the boundaries of what's possible in neural network architectures and opening new avenues for research.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/deep-learning-trends" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Deep Learning Trends to Watch
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      Explore the latest trends in deep learning, including new architectures and training techniques that are shaping the future of AI.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
              </div>

              <h2 className="font-serif text-3xl mt-8 mb-4 border-t border-black pt-6">Ethics & Policy</h2>
              <div className="space-y-6">
                <article>
                  <Link to="/articles/ai-regulations" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Global AI Regulations Take Shape
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      The United Nations has announced a new framework for AI governance, aiming to balance innovation with ethical considerations. This initiative seeks to ensure responsible AI development worldwide.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/ai-law-enforcement" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      AI in Law Enforcement
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      As AI technologies are increasingly used in law enforcement, concerns about privacy and civil liberties are being raised. Experts call for transparent policies to guide AI's role in policing.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/ai-ethics" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Navigating AI Ethics in 2024
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      A deep dive into the ethical challenges and considerations that are shaping the development and deployment of AI technologies.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-span-2 border-r border-gray-300 px-6">
              <h2 className="font-serif text-3xl mb-4">Research Highlights</h2>
              <div className="space-y-6">
                <article>
                  <Link to="/articles/quantum-ml" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Quantum ML Shows Promise
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      Hybrid quantum-classical algorithms are achieving new states of performance, offering a glimpse into the future of machine learning. This research could lead to breakthroughs in computational efficiency.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/rl-breakthrough" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Reinforcement Learning Breakthrough
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      Multi-agent systems have mastered complex tasks, demonstrating the potential of reinforcement learning to solve real-world problems. This progress highlights the versatility of RL techniques.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/ai-research-trends" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      AI Research Trends in 2024
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      Discover the key research trends in AI for 2024, including emerging technologies and methodologies that are driving innovation.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
              </div>

              <h2 className="font-serif text-3xl mt-8 mb-4 border-t border-black pt-6">Industry Impact</h2>
              <div className="space-y-6">
                <article>
                  <Link to="/articles/ai-manufacturing" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      Manufacturing Sees AI Revolution
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      AI-driven smart factories are reporting efficiency gains of up to 300%, transforming the manufacturing landscape. This shift is expected to enhance productivity and reduce operational costs.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/ai-agriculture" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      AI in Agriculture
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      Precision farming with AI-driven insights is optimizing crop yields and resource management. This technology is paving the way for sustainable agricultural practices.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article>
                  <Link to="/articles/ai-retail" className="group">
                    <h3 className="font-serif text-2xl group-hover:text-gray-800">
                      AI Transforming Retail
                    </h3>
                    <p className="text-sm mt-2 group-hover:text-gray-700">
                      Explore how AI is reshaping the retail industry, from personalized shopping experiences to inventory management.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-span-2 pl-6">
              <h2 className="font-serif text-3xl mb-4">Latest Updates</h2>
              <div className="space-y-4">
                <article className="border-b border-gray-200 pb-4">
                  <Link to="/articles/automl-adoption" className="group">
                    <h3 className="font-serif text-xl group-hover:text-gray-800">
                      AutoML Tools See Rapid Adoption
                    </h3>
                    <p className="text-sm mt-1 group-hover:text-gray-700">
                      Small businesses are increasingly adopting AutoML tools, benefiting from AI automation without the need for extensive expertise. This trend is democratizing access to advanced technologies.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article className="border-b border-gray-200 pb-4">
                  <Link to="/articles/new-training-methods" className="group">
                    <h3 className="font-serif text-xl group-hover:text-gray-800">
                      New Training Methods Emerge
                    </h3>
                    <p className="text-sm mt-1 group-hover:text-gray-700">
                      Innovative training methods are improving data efficiency by orders of magnitude, enabling faster and more effective model development. These advancements are crucial for scaling AI solutions.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article className="border-b border-gray-200 pb-4">
                  <Link to="/articles/language-models" className="group">
                    <h3 className="font-serif text-xl group-hover:text-gray-800">
                      Language Models Break Records
                    </h3>
                    <p className="text-sm mt-1 group-hover:text-gray-700">
                      Recent breakthroughs in cross-lingual understanding are setting new records for language models, enhancing their ability to process and generate text across multiple languages.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
                <article className="border-b border-gray-200 pb-4">
                  <Link to="/articles/ai-healthcare" className="group">
                    <h3 className="font-serif text-xl group-hover:text-gray-800">
                      AI in Healthcare
                    </h3>
                    <p className="text-sm mt-1 group-hover:text-gray-700">
                      AI is revolutionizing patient diagnosis and care, offering new tools for early detection and personalized treatment plans. This technology is poised to transform healthcare delivery.
                    </p>
                    <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                      Continue Reading →
                    </span>
                  </Link>
                </article>
              </div>

              <div className="mt-8 pt-6 border-t border-black">
                <h2 className="font-serif text-3xl mb-4">Quick Reads</h2>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link to="/articles/tensorflow-3" className="hover:underline">
                      • ML Framework Updates: TensorFlow 3.0 Released
                    </Link>
                  </li>
                  <li>
                    <Link to="/articles/ai-startups" className="hover:underline">
                      • AI Startups Raise $10B in Q1
                    </Link>
                  </li>
                  <li>
                    <Link to="/articles/benchmark-dataset" className="hover:underline">
                      • New Benchmark Dataset Released
                    </Link>
                  </li>
                  <li>
                    <Link to="/articles/icml-keynotes" className="hover:underline">
                      • Conference Updates: ICML Announces Keynotes
                    </Link>
                  </li>
                  <li>
                    <Link to="/articles/ai-education" className="hover:underline">
                      • AI in Education: Personalized Learning Paths
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
