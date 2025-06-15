import React, { useRef, useState } from "react";

export default function AddIdeaModal({ onClose, onSave }) { // Receives onSave
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [textboxes, setTextboxes] = useState([]);
  const [name, setName] = useState("");

  // ... (handleMouseDown, handleMouseMove, handleMouseUp, etc. are unchanged)
  const handleMouseDown = (e) => {
    if (e.target.tagName === "TEXTAREA") return;
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

  const handleMouseUp = () => setIsDrawing(false);

  const handleCanvasClick = (e) => {
    if (e.target.tagName === "TEXTAREA") return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextboxes((prev) => [...prev, { id: Date.now(), x, y, text: "" }]);
  };

  const updateTextbox = (id, newText) => {
    setTextboxes((prev) => prev.map((tb) => (tb.id === id ? { ...tb, text: newText } : tb)));
  };

  const handleTextboxDrag = (e, tb) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = tb.x;
    const origY = tb.y;
    const onMouseMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      setTextboxes((prev) => prev.map((box) => (box.id === tb.id ? { ...box, x: origX + dx, y: origY + dy } : box)));
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };
  
  // This function calls the onSave prop
  const save = () => {
    const canvasData = canvasRef.current.toDataURL("image/png");
    onSave({
      name,
      drawing: canvasData,
      textboxes,
    });
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0, zIndex: 1000, background: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 10, background: "#222", color: "#fff" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Idea name" style={{ padding: 5, width: "200px", marginRight: 10 }} />
        <button onClick={save}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>

      <div ref={containerRef} onClick={handleCanvasClick} style={{ flex: 1, position: "relative", background: "#f0f0f0" }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight - 50} style={{ position: "absolute", top: 0, left: 0 }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
        {textboxes.map((tb) => (
          <textarea key={tb.id} value={tb.text} onChange={(e) => updateTextbox(tb.id, e.target.value)} onMouseDown={(e) => handleTextboxDrag(e, tb)} style={{ position: "absolute", top: tb.y, left: tb.x, zIndex: 1, resize: "both", fontSize: "14px", background: "#ffffe0", border: "1px solid #aaa", padding: "2px", minWidth: "80px", minHeight: "30px" }} />
        ))}
      </div>
    </div>
  );
}