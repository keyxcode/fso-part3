const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const savePerson = (name, number) => {
  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log("person saved!");
    mongoose.connection.close();
  });
};

const fetchAll = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  console.log(`saving ${process.argv[3]} - ${process.argv[4]}`);
  savePerson(name, number);
} else if (process.argv.length === 3) {
  fetchAll();
} else {
  console.log("password to retrieve all; password name number to save new");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://keyxcode:${password}@cluster0.sz9gtfg.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);
