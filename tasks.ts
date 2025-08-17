
import { Router } from "express";
const router = Router();
let tasks: { id: number; title: string; completed: boolean }[] = [];

router.get("/", (req, res) => res.json(tasks));
router.post("/", (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { completed, title } = req.body;
  const task = tasks.find(t => t.id === id);
  if (task) {
    if (completed !== undefined) task.completed = completed;
    if (title) task.title = title;
    res.json(task);
  } else { res.status(404).json({ message: "Task not found" }); }
});
export default router;
