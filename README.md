# Infinite Canvas with Shape Manipulation - React + TypeScript + Konva.js

This project is a React application developed using Vite and TypeScript, integrated with the Konva.js library. It provides an infinite canvas that allows users to add and interact with shapes.

## Features

### 1. Infinite Canvas

- The application includes a canvas that occupies the full screen and allows for infinite scrolling in any direction.
- Users can pan the canvas freely to explore an endless drawing space.

### 2. Shape Addition

- A toolbar with a dropdown menu allows users to select and add different shapes to the canvas. The available shapes include:
  - Rectangle
  - Circle
  - Triangle
- Once selected, the shape is placed on the canvas, ready for further interaction.

### 3. Shape Interaction

- After adding shapes, the user can interact with them using the **cursor mode** available on the toolbar.
- In cursor mode, shapes can be:
  - Dragged around the canvas

### 4. Tool Selection

- The toolbar consists of two main tools:
  - **Shape Selection Tool**: A dropdown menu that allows users to pick one of three shapes to add to the canvas.
  - **Cursor Tool**: Allows users to drag and reposition the shapes on the canvas.

## Installation and Setup

To set up and run the project locally:

1. Clone the repository:

   ```bash
   git clone <repository-url>

   ```

2. Install the dependencies:

   npm install

3. Run the development server:

   npm run dev

## Usage

- To add shapes to the canvas, select a shape from the dropdown menu on the toolbar.
  - After adding a shape, you can interact with it by switching to the cursor mode and dragging the shape across the canvas.
  - You can also pan across the infinite canvas by holding and dragging with the mouse on empty canvas space.
