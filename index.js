require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("build"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
//   {
//     id: 5,
//     name: "test",
//     number: "123",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/info", (request, response) => {
  const dateNow = Date(Date.now());

  response.send(
    `<div>Phonebook has info for ${persons.length} people</div>
    <div>${dateNow}</div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (!person) return response.status(404).end();
  return response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  return response.status(204).end();
});

// const generateRandomId = () => {
//   const RANGE = 100000;
//   return Math.floor(Math.random() * RANGE);
// };

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // if (persons.find((p) => p.name === body.name)) {
  //   return response.status(400).json({
  //     error: "person already exists in phonebook",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => response.json(savedPerson));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
