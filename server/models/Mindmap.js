const mongoose = require("mongoose");

const mindmapSchema = new mongoose.Schema({
  title: String,
  nodes: Array,
  edges: Array,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Mindmap", mindmapSchema);
