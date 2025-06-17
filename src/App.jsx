import React, { useState } from "react";
import TopBar from "./components/TopBar";
import IdeaSection from "./components/IdeaSection";
import AddIdeaModal from "./components/AddIdeaModal";
import IdeaModal from "./components/IdeaModal";
import CalendarView from "./components/CalendarView"; // ✅ NEW: Import CalendarView

export default function App() {
  const [projects, setProjects] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [showAddIdea, setShowAddIdea] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [ideaToEdit, setIdeaToEdit] = useState(null);
  const [currentView, setCurrentView] = useState("calendar"); // ✅ NEW: State to control the view, default to calendar

  const addProject = () => {
    const name = prompt("Enter new project name:");
    if (name) {
      setProjects([...projects, { id: Date.now(), name, tags: [] }]);
    }
  };

  const handleEditIdea = (idea) => {
    setIdeaToEdit(idea);
    setShowAddIdea(true);
  };

  const handleSwitchToEdit = (idea) => {
    setSelectedIdea(null);
    handleEditIdea(idea);
  };

  const saveIdea = (ideaData) => {
    if (ideaData.id) {
      setIdeas(ideas.map(i => i.id === ideaData.id ? ideaData : i));
    } else {
      setIdeas([...ideas, { ...ideaData, id: Date.now() }]);
    }
    setShowAddIdea(false);
    setIdeaToEdit(null);
  };

  const handleCloseModal = () => {
    setShowAddIdea(false);
    setIdeaToEdit(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column", fontFamily: "Arial, sans-serif" }}>
      <TopBar
        onNewProject={addProject}
        onAddIdeaClick={() => setShowAddIdea(true)}
        setCurrentView={setCurrentView} // ✅ NEW: Pass view setter to TopBar
      />

      {/* ✅ NEW: Conditionally render Calendar or Projects view */}
      {currentView === "calendar" ? (
        <CalendarView />
      ) : (
        <div style={{ display: "flex", flex: 1, overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
            {projects.length === 0 ? (
              <p>No projects yet. Click “New Project” to start!</p>
            ) : (
              projects.map((proj) => (
                <div key={proj.id} style={{ border: "1px solid #ccc", marginBottom: 15, padding: 10, borderRadius: 6 }}>
                  <h3>{proj.name}</h3>
                </div>
              ))
            )}
          </div>
          <IdeaSection ideas={ideas} onSelectIdea={setSelectedIdea} />
        </div>
      )}


      {showAddIdea && (
        <AddIdeaModal
          onClose={handleCloseModal}
          onSave={saveIdea}
          existingIdea={ideaToEdit}
        />
      )}

      {selectedIdea && (
        <IdeaModal
          idea={selectedIdea}
          onClose={() => setSelectedIdea(null)}
          onEdit={handleSwitchToEdit}
        />
      )}
    </div>
  );
}