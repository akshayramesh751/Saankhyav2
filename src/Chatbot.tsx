import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const qaData: Record<string, Record<string, string>> = {
  Admissions: {
    "What is the admission process?": "The admission process is simple. Parents can fill out our registration form online or visit our centre directly. After a short assessment, your child will be placed in the most suitable batch.",
    "Which boards do you cover?": "We teach students from multiple boards including CBSE, ICSE, State Boards, and select international boards (IGCSE/IB) depending on demand.",
    "What grade levels do you cover?": "We provide coaching for students from Grade 8 up to Grade 12, including both school syllabus support and competitive exam preparation.",
    "How can I contact support?": "Phone: +91-93807 38490, Email: admin@saankhya.academy"
  },
  Fees: {
    "How much are the fees?": "Our fees vary depending on grade and program. Please contact us for a detailed fee structure."
  },
  Teaching: {
    "What subjects do you teach?": "We offer classes in Mathematics, Science (Physics, Chemistry, and Biology) for high school students. For higher grades, we also provide coaching in Mathematics, Physics, Chemistry, and Biology.",
    "What grade levels do you cover?": "We provide coaching for students from Grade 8 up to Grade 12, including both school syllabus support and competitive exam preparation.",
    "How are classes conducted?": "We offer both offline (in-person) classes at our centre and online live classes for students who prefer studying from home. Parents can choose whichever suits them best.",
    "What makes your academy different from others?": "We focus on personalized attention, labs, simulations and mainly - small batch sizes, regular progress reports, and interactive teaching methods to ensure every child understands concepts thoroughly.",
    "What is the student-teacher ratio?": "We maintain small batches with a maximum of 10 to 15 students per teacher, ensuring personal attention and better interaction.",
    "Do you provide extra doubt-clearing sessions?": "Yes, we conduct dedicated doubt-clearing sessions and revision classes, especially before exams, to make sure every student is confident with the syllabus."
  },
  Timings: {
    "What are your class timings?": "Classes are usually held in the evenings on weekdays and in the mornings/evenings on weekends. Exact timings depend on the grade and subjects.",
    "Do you provide weekend batches?": "Yes, we have special weekend batches designed for students who have busy schedules during weekdays."
  },
  Results: {
    "How do you track student progress?": "We conduct regular tests, assignments, and parent-teacher meetings. Parents receive progress reports and feedback so they can track their child’s improvement.",
    "Do you give feedback to parents?": "Yes, we strongly believe in parent involvement. Parents are regularly updated about their child’s performance through meetings and reports.",
    "What results have your students achieved?": "Our students have consistently scored high marks in their school exams and board exams. Many have also successfully cleared competitive exams with our guidance."
  },
  General: {
    "Do you have extracurricular activities?": "Yes, in addition to academics, we sometimes organize workshops and activities that focus on communication skills, problem-solving, and personality development.",
    "How can I contact support?": "Phone: +91-93807 38490, Email: admin@saankhya.academy"
  }
};

const categories = Object.keys(qaData);

type Message = {
  sender: "user" | "bot";
  text: string;
};

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showQuestions, setShowQuestions] = useState(true);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Handle question click
  const handleQuestionClick = (question: string) => {
    const answer = selectedCategory ? qaData[selectedCategory][question] : "";
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "bot", text: answer }
    ]);
    setShowQuestions(false);
  };

  // Reset state when closing
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSelectedCategory(null);
      setMessages([]);
      setShowQuestions(true);
    }, 300);
  };

  // When selecting a new category, reset to question selection view
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setShowQuestions(true);
  };

  // Back button to go from chat body to question selection in same category
  const handleBackToQuestions = () => {
    setShowQuestions(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[99999] bg-blue-900 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-3xl hover:bg-orange-500 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        aria-label="Open Chatbot"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-8 right-8 z-[99999] w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white rounded-t-2xl">
              <span className="font-bold text-lg">Sāṅkhya Chatbot</span>
              <button
                onClick={handleClose}
                className="text-white hover:text-orange-400 transition-colors"
                aria-label="Close Chatbot"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              className="flex-1 px-4 py-4 bg-white overflow-y-auto"
              style={{ minHeight: "260px", maxHeight: "340px" }}
            >
              {/* Show chat history */}
              {messages.length > 0 && (
                <div className="mb-4 flex flex-col gap-2">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`px-4 py-2 rounded-xl max-w-[80%] ${
                          msg.sender === "user"
                            ? "bg-blue-900 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Show categories or questions */}
              {!selectedCategory ? (
                <div>
                  <div className="mb-2 font-semibold text-gray-700">Choose a category:</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className="px-4 py-2 rounded-full bg-blue-100 text-blue-900 font-medium hover:bg-orange-400 hover:text-white transition-all duration-200 shadow-sm"
                        onClick={() => handleCategorySelect(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ) : showQuestions ? (
                <div>
                  <div className="mb-2 font-semibold text-gray-700">Select a question:</div>
                  <div className="flex flex-col gap-2">
                    {Object.keys(qaData[selectedCategory]).map((q) => (
                      <button
                        key={q}
                        className="text-left px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-blue-900 hover:text-white transition-all duration-200 shadow-sm"
                        onClick={() => handleQuestionClick(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <button
                    className="mt-4 px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-xs hover:bg-orange-400 hover:text-white transition-all"
                    onClick={() => setSelectedCategory(null)}
                  >
                    ← Back to categories
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="mb-4 px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-xs hover:bg-orange-400 hover:text-white transition-all"
                    onClick={handleBackToQuestions}
                  >
                    ← Back to questions
                  </button>
                  {/* Optionally, you can show the last question and answer here, or just the chat history */}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
              Powered by Sāṅkhya Academy
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;