// App.tsx
import DarkModeToggle from './DarkModeToggle';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import IncidentForm from './IncidentForm';
import IncidentList from './IncidentList';
import FilterControls from './FilterControls';
import './App.css';

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
}

// Initial mock data as specified in the assignment
const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in product recommendations, leading to unequal access to opportunities. Investigation revealed training data imbalance which has now been addressed.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information when queried about emergency protocols. This led to confusion during a test run but was caught before deployment. Model has been retrained with more accurate safety data.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata in responses. No personal or identifying information was revealed, but system has been patched to prevent similar occurrences.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("Newest First");
  const [showForm, setShowForm] = useState<boolean>(false);

  // Initialize with mock data
  useEffect(() => {
    setIncidents(mockIncidents);
  }, []);

  const addIncident = (incident: Incident) => {
    setIncidents([...incidents, incident]);
    setShowForm(false); // Hide form after submission
  };

  // Filter incidents based on severity
  const filteredIncidents = incidents.filter(incident => 
    severityFilter === "All" ? true : incident.severity === severityFilter
  );

  // Sort incidents based on reported date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 md:p-8 transition-all">
      <DarkModeToggle />

      <Toaster position="top-center" reverseOrder={false} />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Safety Incident Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor and report AI safety incidents to build a safer digital world
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Incident Controls</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
            >
              {showForm ? "Hide Form" : "Report New Incident"}
            </button>
          </div>
          
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <IncidentForm addIncident={addIncident} />
            </motion.div>
          )}
          
          <FilterControls 
            severityFilter={severityFilter} 
            setSeverityFilter={setSeverityFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </motion.div>

        {/* Incidents List Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Reported Incidents</h2>
          <IncidentList incidents={sortedIncidents} />
        </motion.div>
      </div>
    </div>
  );
};

export default App;