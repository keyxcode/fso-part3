require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{6,}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Contact number is required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const fetchAll = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

const savePerson = (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
};

module.exports = mongoose.model("Person", personSchema);
