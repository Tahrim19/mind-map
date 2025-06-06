const express = require("express");
const Mindmap = require("../models/Mindmap.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.sendStatus(403);
  }
}

// GET all mindmaps for user
router.get("/", auth, async (req, res) => {
  const maps = await Mindmap.find({ userId: req.userId });
  res.json(maps);
});

// GET one mindmap by ID (for editing/viewing)
router.get("/:id", auth, async (req, res) => {
  try {
    const map = await Mindmap.findOne({ _id: req.params.id, userId: req.userId });
    if (!map) return res.status(404).json({ message: "Mindmap not found" });
    res.json(map);
  } catch (err) {
    console.error("Fetch mindmap error:", err);
    res.status(500).json({ message: "Failed to fetch mindmap" });
  }
});

// POST create mindmap
router.post("/", auth, async (req, res) => {
  const { title, nodes, edges } = req.body;
  try {
    const map = await Mindmap.create({
      userId: req.userId,
      title: title || "Untitled Mindmap",
      nodes: nodes || [],
      edges: edges || [],
    });
    res.json(map);
  } catch (err) {
    console.error("Error creating mindmap:", err);
    res.status(500).json({ message: "Failed to create mindmap" });
  }
});

// PUT update mindmap (including rename)
router.put("/:id", auth, async (req, res) => {
  const { title, nodes, edges } = req.body;
  try {
    const map = await Mindmap.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, nodes, edges },
      { new: true }
    );
    if (!map) return res.status(404).json({ message: "Mindmap not found" });
    res.json(map);
  } catch (err) {
    console.error("Error updating mindmap:", err);
    res.status(500).json({ message: "Failed to update mindmap" });
  }
});

// DELETE mindmap
router.delete("/:id", auth, async (req, res) => {
  try {
    await Mindmap.deleteOne({ _id: req.params.id, userId: req.userId });
    res.sendStatus(204);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete mindmap" });
  }
});

module.exports = router;
