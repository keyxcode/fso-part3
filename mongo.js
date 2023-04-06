const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://keyxcode:${password}@cluster0.sz9gtfg.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "test",
  number: 123,
});

person.save().then((result) => {
  console.log("person saved!");
  // close the db connection (necessary)
  mongoose.connection.close();
});

// Fetching objects from the database with the find() method
// If the passed in object is empty => fetch all
// Note.find({ content: "CSS is hard" }).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
