import React, { useRef, useState, useEffect } from "react";

export default function AddIdeaModal({ onClose, onSave, existingIdea = null }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [textboxes, setTextboxes] = useState([]);
  const [name, setName] = useState("");

  // Effect to load data if we are editing an existing idea
  useEffect(() => {
    if (existingIdea) {
      setName(existingIdea.name);
      setTextboxes(existingIdea.textboxes || []);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing
        ctx.drawImage(image, 0, 0);
      };
      image.src = existingIdea.drawing;
    }
  }, [existingIdea]);

  // Drawing on canvas (RIGHT-CLICK)
  const handleMouseDown = (e) => {
    if (e.button !== 2 || e.target.tagName === "TEXTAREA") return; // Only draw on Right-click
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = (e) => {
    if (e.button !== 2) return; // Only stop drawing on Right-click release
    setIsDrawing(false);
  };

  // Add text box (LEFT-CLICK)
  const handleCanvasClick = (e) => {
    if (isDrawing || e.target.tagName === "TEXTAREA") return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTextboxes((prev) => [
      ...prev,
      { id: Date.now(), x, y, text: "" },
    ]);
  };

  // Update text box text
  const updateTextbox = (id, newText) => {
    setTextboxes((prev) =>
      prev.map((tb) => (tb.id === id ? { ...tb, text: newText } : tb))
    );
  };

  // Drag to move text box
  const handleTextboxDrag = (e, tb) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = tb.x;
    const origY = tb.y;

    const onMouseMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      setTextboxes((prev) =>
        prev.map((box) =>
          box.id === tb.id ? { ...box, x: origX + dx, y: origY + dy } : box
        )
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const save = () => {
    const canvasData = canvasRef.current.toDataURL("image/png");
    // ✅ NEW: Save the canvas's dimensions along with the idea data.
    const ideaPayload = {
      name,
      drawing: canvasData,
      textboxes,
      id: existingIdea ? existingIdea.id : undefined,
      originalWidth: canvasRef.current.width,
      originalHeight: canvasRef.current.height,
    };
    onSave(ideaPayload);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, bottom: 0, right: 0,
        zIndex: 1000,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 10, background: "#222", color: "#fff" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Idea name"
          style={{ padding: 5, width: "200px", marginRight: 10 }}
        />
        <button onClick={save}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>

      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        onContextMenu={(e) => e.preventDefault()}
        style={{ flex: 1, position: "relative", background: "#f0f0f0" }}
      >
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight - 50}
          style={{ position: "absolute", top: 0, left: 0, cursor: 'crosshair' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />

        {textboxes.map((tb) => (
          <textarea
            key={tb.id}
            value={tb.text}
            onChange={(e) => updateTextbox(tb.id, e.target.value)}
            onMouseDown={(e) => handleTextboxDrag(e, tb)}
            style={{
              position: "absolute",
              top: tb.y,
              left: tb.x,
              zIndex: 1,
              resize: "both",
              fontSize: "14px",
              background: "#ffffe0",
              border: "1px solid #aaa",
              padding: "2px",
              minWidth: "80px",
              minHeight: "30px",
            }}
          />
        ))}
      </div>
    </div>
  );
}