import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Todo } from "./models/Todo.js";
import "dotenv/config";

const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(cors());

// conectando a una base de datos local 
// mongoose
//   .connect("mongodb://127.0.0.1:27017/mern-todo", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to DB"))
//   .catch(() => {
//     console.error;
//     process.exit(1);
//   });


// conectando a una base de datos en la nube con mongodb atlas
mongoose
  .connect(process.env.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.listen(3001, () => console.log("Servidor corriendo en puerto 3001"));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  const todoo = await todo.save();
  res.json(todoo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  const completeTodo = await todo.save();
  res.json(completeTodo);
});

app.put("/todo/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.text = req.body.text;
  const updatetodo = await todo.save();
  res.json(updatetodo);
});
