const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { query } = require("express");

mongoose.Promise = global.Promise;

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = {};

db.mongoose = mongoose;
db.url = "mongodb+srv://Jazmin:pass@cluster0.ogaif.mongodb.net/mydb";
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!");
    process.exit();
  });

const Pepper = mongoose.model(
  "pepper",
  mongoose.Schema({
    name: String,
    color: String,
    shu: {
      min: Number,
      max: Number,
    },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Pepper App" });
});

app.post("/pepper/", (req, res) => {
  if (!req.body.name || !req.body.color) {
    res.status(400).send({ message: "Peppers requires name and color" });
    return;
  } else if (!req.body.shu.min || !req.body.shu.max) {
    res.status(400).send({ message: "Peppers requires min and max" });
    return;
  }

  const pepper = new Pepper({
    name: req.body.name,
    color: req.body.color,
    shu: {
      min: req.body.shu.min,
      max: req.body.shu.max,
    },
  });

  pepper
    .save(pepper)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Pepper Was Not Saved" });
    });
});

app.get("/peppers/", (req, res) => {
  Pepper.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
});

app.get("/peppers/:name", (req, res) => {
  const name = req.params.name;

  Pepper.find({ name: name })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Pepper Not Found With Name: " + name });
      } else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error Retreiving Pepper With Name " + name });
    });
});

//add multiple peppers to the server in one request

app.post("/peppers/multiple", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request must include a body" });
  } else if (!Array.isArray(req.body)) {
    res.status(400).send({ message: "Must be an Array of Peppers" });
  }

  let peppers = req.body;

  for (let pepper of Pepper) {
    if (!pepper.name || !pepper.color) {
      res
        .status(400)
        .send({ message: "Peppers require name and color", badPepper: pepper });
      return;
    } else if (!pepper.shu.min || !pepper.shu.max) {
      res
        .status(400)
        .send({ message: "Peppers require min and max", badPepper: pepper });
      return;
    }
  }

  Pepper.insertMany(req.body)
    .then((data) => {
      res.send({ message: "All peppers inserted", data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Peppers Were Not Saved" });
    });
});

app.get("/peppers/", (req, res) => {
  Pepper.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
});

//return all peppers with a specific color

app.get("/peppers/color/:color", (req, res) => {
  const color = req.params.color;

  Pepper.find({ color: color })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Pepper Not Found With Color: " + color });
      } else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error Retreiving Pepper With Color: " + color });
    });
});

//return all peppers that are hotter than a specific heat (use min shu)

app.get("/peppers/heat/gt/:heat", (req, res) => {
  const heat = req.params.heat;

  Pepper.find()
    .where("shu.max")
    .gt(heat)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Pepper Not Found With Higher SHU Than: " + heat });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Retreiving Pepper" });
    });
});

//return all peppers that are less hot that a specific heat (use max shu)

app.get("/peppers/heat/lt/:heat", (req, res) => {
  const heat = req.params.heat;

  Pepper.find()
    .where("shu.min")
    .lt(heat)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Pepper Not Found With Lower SHU Than: " + heat });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Retreiving Pepper" });
    });
});

app.delete("/pepper/:name", (req, res) => {
  var name = req.params.name;
  var query = {
    name: name,
  };

  Pepper.findOneAndRemove(query)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No Pepper Found" });
      }
      res.send({ message: "Pepper was deleted" });
    })
    .catch((error) => {
      res.status(500).send({ message: "Could not delete pepper" });
    });
});

app.put("/pepper/:id", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "No update info entered" });
  }
  const id = req.params.id;

  Pepper.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Could not update pepper with id:" + id });
      } else res.send({ message: "Pepper Updated" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating pepper with id" + id });
    });
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
