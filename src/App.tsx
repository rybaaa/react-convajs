import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, RegularPolygon } from "react-konva";
import Konva from "konva";

type ShapeType = "rectangle" | "circle" | "triangle";
type ToolType = "select" | ShapeType;

interface Shape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  isDragging: boolean;
}

const App: React.FC = () => {
  const [tool, setTool] = useState<ToolType>("select");
  const [shapes, setShapes] = useState<Shape[]>([]);
  const stageRef = useRef<Konva.Stage>(null);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        stageRef.current.width(window.innerWidth);
        stageRef.current.height(window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = Number(e.target.id());
    setShapes(
      shapes.map((shape) => ({
        ...shape,
        isDragging: shape.id === id,
      }))
    );
  };

  const handleDragEnd = () => {
    setShapes(
      shapes.map((shape) => ({
        ...shape,
        isDragging: false,
      }))
    );
  };

  const addShape = (pos: { x: number; y: number }) => {
    if (tool === "select") return;

    const newShape: Shape = {
      id: Date.now(),
      type: tool,
      x: pos.x - stagePos.x,
      y: pos.y - stagePos.y,
      width: 100,
      height: 100,
      fill: Konva.Util.getRandomColor(),
      isDragging: false,
    };

    setShapes([...shapes, newShape]);
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      const stage = stageRef.current;
      if (!stage) return;

      const pos = stage.getPointerPosition();
      if (pos) {
        addShape(pos);
      }
    }
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    setStagePos(newPos);
  };

  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTool(e.target.value as ShapeType);
  };

  return (
    <div>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
        <select value={tool === "select" ? "" : tool} onChange={handleShapeChange} style={{ marginRight: 10 }}>
          <option value="" disabled>
            Select Shape
          </option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
        <button
          onClick={() => setTool("select")}
          style={{
            backgroundColor: tool === "select" ? "#4CAF50" : "#f1f1f1",
            color: tool === "select" ? "white" : "black",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Select (Move)
        </button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleStageClick}
        onWheel={handleWheel}
        draggable={tool === "select"}
        ref={stageRef}
      >
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "rectangle") {
              return (
                <Rect
                  key={shape.id}
                  id={shape.id.toString()}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill={shape.fill}
                  draggable={tool === "select"}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  key={shape.id}
                  id={shape.id.toString()}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.width / 2}
                  fill={shape.fill}
                  draggable={tool === "select"}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            } else if (shape.type === "triangle") {
              return (
                <RegularPolygon
                  key={shape.id}
                  id={shape.id.toString()}
                  x={shape.x}
                  y={shape.y}
                  sides={3}
                  radius={shape.width / 2}
                  fill={shape.fill}
                  draggable={tool === "select"}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
