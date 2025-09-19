import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { GiMicroscope, GiProgression, GiTeacher, } from "react-icons/gi";

const tabContent = {
  structured: {
    heading: "Structured Learning",
    paragraph:
      "Our curriculum follows a well-defined structure, ensuring students master concepts step-by-step. Each topic builds on the previous, creating a strong academic foundation.",
    bullets: [
      "Continuous Assessment & Worksheets",
      "Comprehensive Coverage by Experts",
      "Progress tracking for each student",
    ],
    icon: <GiProgression className="text-sky-700 text-6xl mx-auto" />,
  },
  handsOn: {
    heading: "Hands-On Approach",
    paragraph:
      "We believe in learning by doing. Our hands-on activities and experiments help students apply concepts, fostering deeper understanding and retention.",
    bullets: [
      "Lab sessions and real-world projects",
      "Interactive workshops",
      "Encouragement of curiosity and exploration",
    ],
    icon: <GiMicroscope className="text-orange-500 text-6xl mx-auto" />,
  },
  support: {
    heading: "Support System",
    paragraph:
      "Our support system ensures every student receives guidance and mentorship. We provide resources and counseling to help students overcome challenges.",
    bullets: [
      "Personalized mentoring and counselling",
      "Academic and emotional support",
      "Additional sessions whenever a student feels stuck",
    ],
    icon: <GiTeacher className="text-green-600 text-6xl mx-auto" />,
  },
};

const gradeLabels = [
  "Class 8",
  "Class 9",
  "Class 10",
  "PUC I",
  "PUC II",
];

const boardExamData = [90, 80, 70, 60, 50];
const competitiveExamData = [10, 20, 30, 40, 50];

const tabKeys = [
  { key: "structured", label: "Structured Learning" },
  { key: "handsOn", label: "Hands-On Approach" },
  { key: "support", label: "Support System" },
];

const CoursesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"structured" | "handsOn" | "support">("structured");
  const [fade, setFade] = useState(true);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let chartTimeout: ReturnType<typeof setTimeout> | null = null;

    if (chartContainerRef.current && chartRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !chartInstanceRef.current) {
            chartTimeout = setTimeout(() => {
              const ctx = chartRef.current?.getContext("2d");
              if (ctx) {
                chartInstanceRef.current = new Chart(ctx, {
                  type: "bar",
                  data: {
                    labels: gradeLabels,
                    datasets: [
                      {
                        label: "Board Exam Focus",
                        data: boardExamData,
                        backgroundColor: "#2563eb",
                        stack: "Stack 0",
                      },
                      {
                        label: "Competitive Exam Foundation",
                        data: competitiveExamData,
                        backgroundColor: "#f59e42",
                        stack: "Stack 0",
                      },
                    ],
                  },
                  options: {
                    indexAxis: "y",
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          font: { size: 14 },
                        },
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        stacked: true,
                        max: 100,
                        ticks: { font: { size: 12 } },
                        title: { display: true, text: "% Focus" },
                      },
                      y: {
                        stacked: true,
                        ticks: { font: { size: 12 } },
                      },
                    },
                  },
                });
              }
            }, 400); // <-- Add a 400ms delay before chart creation
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(chartContainerRef.current);
    }

    return () => {
      if (observer && chartContainerRef.current) {
        observer.unobserve(chartContainerRef.current);
      }
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
      if (chartTimeout) {
        clearTimeout(chartTimeout);
      }
    };
  }, []);

  // Fade animation for tab content
  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <section id="courses" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-black mb-4 font-serif text-center drop-shadow-lg">What Parents Actually Want</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-orange-400 mx-auto mb-2"></div>
        {/* Tab Navigation */}
        <nav className="w-full flex flex-col items-center mb-12">
          <div className="w-full max-w-2xl mx-auto bg-white-50 rounded-2xl py-4 px-2 flex justify-center shadow-sm relative">
            {tabKeys.map(({ key, label }) => (
              <button
                key={key}
                className={`rounded-full font-semibold shadow-lg transition-all duration-300 transform
                  ${activeTab === key
                    ? "bg-blue-900 text-white hover:bg-orange-500 scale-105"
                    : "bg-grey-100 text-gray-600 hover:bg-gray-200"}
                  focus:outline-none
                  px-4 py-2 text-base   // Mobile: smaller padding and font
                  sm:px-6 sm:py-3 sm:text-lg // PC: larger padding and font
                   mx-1 sm:mx-2
                `}
                onClick={() => setActiveTab(key as typeof activeTab)}
                aria-selected={activeTab === key}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Panels */}
        <div className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"} mb-14`}>
          <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-blue-900 font-serif">{tabContent[activeTab].heading}</h3>
                <p className="text-lg text-gray-700 mb-4">{tabContent[activeTab].paragraph}</p>
                <ul className="list-disc list-inside space-y-2 text-base">
                  {tabContent[activeTab].bullets.map((item, idx) => (
                    <li key={idx} className="text-gray-700 marker:text-sky-700">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center items-center">
                {tabContent[activeTab].icon}
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-10 text-center">
          <h3 className="text-3xl font-bold mb-2 text-black-900 font-serif">Building a Foundation for Success</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Our curriculum is carefully designed to build a strong academic foundation, progressively increasing focus on competitive exams as students advance through higher grades.
          </p>
          <div
            ref={chartContainerRef}
            className="chart-container mx-auto max-w-xl bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-4"
          >
            <canvas id="programsChart" ref={chartRef} height={220}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;