import React, { useState } from "react";
import TopBar from "./components/TopBar";
import IdeaSection from "./components/IdeaSection";
import AddIdeaModal from "./components/AddIdeaModal";
import IdeaModal from "./components/IdeaModal";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [showAddIdea, setShowAddIdea] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const addProject = () => {
    const name = prompt("Enter new project name:");
    if (name) {
      setProjects([...projects, { id: Date.now(), name, tags: [] }]);
    }
  };

  // This function saves the idea AND closes the modal.
  const saveIdea = (idea) => {
    setIdeas([...ideas, { ...idea, id: Date.now() }]);
    setShowAddIdea(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column", fontFamily: "Arial, sans-serif" }}>
      <TopBar onNewProject={addProject} onAddIdeaClick={() => setShowAddIdea(true)} />

      <div style={{ display: "flex", flex: 1 }}>
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

      {/* Ensure this line passes onSave={saveIdea} */}
      {showAddIdea && <AddIdeaModal onClose={() => setShowAddIdea(false)} onSave={saveIdea} />}

      {selectedIdea && <IdeaModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />}
    </div>
  );
}