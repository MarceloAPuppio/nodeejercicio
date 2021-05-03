const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

let contactos = [
  { id: 1, name: "Firu", number: "1234" },
  { id: 2, name: "Dante", number: "5678" },
  { id: 3, name: "Arena", number: "91011" },
  { id: 4, name: "Pchán", number: "11121314" },
  { id: 5, name: "Chopper", number: "15161718" },
];
app.listen(PORT, () => {
  console.log("Escuchando desde el puerto 3001");
});

app.get("/info", (req, res) => {
  let localdate = new Date();
  let html = `<header>
                <h4>Cantidad de registros ${contactos.length}</h4>
                <h5>${localdate}</h5>
            </header>`;
  res.send(html);
});
app.get("/api/persons", (req, res) => {
  res.status(200).json(contactos);
});

app.get("/api/persons/:id", (req, res) => {
  let id = +req.params.id;
  let contacto = contactos.find((contacto) => contacto.id === id);
  console.log(contacto, "existe?");
  contacto ? res.json(contacto) : res.status(404).json("{'message':'error'}");
});

app.delete("/api/persons/:id", (req, res) => {
  let id = +req.params.id;
  let ids = contactos.map((contacto) => contacto.id);
  if (ids.includes(id)) {
    contactos = [...contactos.filter((contacto) => contacto.id !== id)];
    res.json(contactos);
  } else res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  const arrNames = contactos.map((contacto) => contacto.name);

  if (!name || !number) {
    console.log(name, number);
    return res.status(400).json({
      error: "content missing",
    });
  }
  if (arrNames.includes(name))
    return res.status(400).json({ error: "nombre ya registrado" });
  const newPerson = { name, number };
  newPerson.id = generateRandomId();
  contactos = [...contactos, newPerson];
  res.json(newPerson);
});

const generateRandomId = () => {
  let number = Math.round(Math.random() * 100000) - 1;
  return number;
};
