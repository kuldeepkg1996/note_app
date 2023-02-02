const express = require('express');
const notes = require("./db/notes")
const cors = require('cors')
require("./db/config");
const app = express();
app.use(express.json());
app.use(cors())
//post

app.post("/notes", async (req, resp) => {
    let note = new notes(req.body);
    let result = await note.save();
    resp.send(result);
    console.log(result)
  });
 
  //get

  app.get("/notes", async (req, resp) => {
    const note = await notes.find();
    if (notes.length > 0) {
      resp.send(note);
      console.log(note)
    } else {
      resp.send({ result: "No notes found" });
    }
  });

//delete 


app.delete("/notes/:id", async (req, resp) => {
    let result = await notes.deleteOne({ _id: req.params.id });
    resp.send(result);
  }),
    app.get("/notes/:id", async (req, resp) => {
      let result = await notes.findOne({ _id: req.params.id });
      if (result) {
        resp.send(result);
      } else {
        resp.send({ result: "No Record Found." });
      }
    });
app.listen(5000);