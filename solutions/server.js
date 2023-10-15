import express from "express";

const port = 3000;

const items = [
  {
    id: 1,
    content: "Item 1",
  },
];

export const app = express();
app.use(express.json());

// GET    /items
// GET    /items/:id
// POST   /items
// PUT    /items/:id
// DELETE /items/:id

app.get("/items", (req, res) => {
  return res.json(items);
});

app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  const itemFound = items.find((item) => item.id === Number(id));

  return res.json(itemFound);
});

app.post("/items", (req, res) => {
  const { content } = req.body;
  const newId = items.length + 1;

  const newItem = {
    id: newId,
    content,
  };
  items.push(newItem);

  return res.json(newItem);
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const itemFound = items.find((item) => item.id === Number(id));

  itemFound.content = content;

  return res.json(itemFound);
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === Number(id));

  items.splice(index, 1);

  return res.status(200).json();
});

export const server = app.listen(process.env.PORT ?? port, () => {
  console.log(`listen server in http://localhost:${process.env.PORT ?? port}`);
});

export default server;
