import Task from "../models/Task.js";

// @desc   Get all tasks
// @route  GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create new task
// @route  POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title wajib diisi" });
    }

    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update task
// @route  PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete task
// @route  DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
