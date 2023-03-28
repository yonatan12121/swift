const express = require("express");

const app = express();
const mongoose=require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());


mongoose.set('strictQuery', true);
  



const mongoUrl = "mongodb+srv://Admin:EGCVzGdOSnHrvC5X@cluster0.c6i7ljl.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));


require("./SongModel");



const Product = mongoose.model("Product");



app.post("/create-product", async (req, res) => {
  const { Name,
    Image,
    Price,
    Description,
    Campanyname } =
    req.body;

  try {
    const data = await Product.create({
      Name,
      Image,
      Price,
      Description,
      Campanyname
      });
    data.save();
    res.send(data);
  } catch (error) {
    res.send({ status: error });
  }
});
app.get("/product-list", async (req, res) => {
  Product.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});



app.post("/addsong", async (req, res) => {
  console.log("Song added");
  const {values} = req.body;

  console.log(values);
  var Title = values.title;
  var Artist = values.artist;
  var Album = values.album;
  var Genre = values.genre;

  try {
    await Songs.create({
      Title,
     Artist,
      Album,
      Genre,
    });
    res.send({ status: "ok" });
    console.log("success");


  } catch (error) {
    res.send({ status: "error" });
    console.log(error);

  }
});


app.get("/Getsong", async (req, res) => {
  Songs.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data);


    }
  })

})

app.get("/Totalsong", async (req, res) => {
  Songs.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data.length);


    }
  })

})

app.get("/genre", async (req, res) => {
  const{ Genre }= req.body;
  console.log(Genre);
  const Song = await Songs.findOne({ Genre });
  var gene;
  if (!Song && Song === null){
    gene="there is no song with that genre"
  }
  else{
  gene=Song;}
  return res.json({ gene });

})


app.get("/artist", async (req, res) => {
  const { Artist } = req.body;
  const Song = await Edirs.findOne({ Artist });
  var gene;
  if (!Song && Song === null) {
    gene = "there is no song with that genre"
  }
  gene = Song;
  return res.json({ gene });

})

app.post("/Updatesong", async (req, res) => {
  const { Title,Artist,Album,Genre } = req.body;
  // console.log(email, firstName, lastName, DOB, nation, gender);
  // console.log(postImage);
  Songs.updateMany({ Title: Title }, { $set: { Artist: Artist, Album: Album, Genre: Genre} }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc)
  });

});

app.post("/Removesong", async (req, res) => {
  const { title } = req.body;
  console.log(title);
  Songs.deleteOne(
    { _id: title }, (err, doc) => {
      if (err) return console.log(err);
      console.log("removed the Song")



    })

 


});

app.post("/create-music", async (req, res) => {
  const { genre, title, artist_name, album_name, art_work, audio_music } =
    req.body;

  try {
    const data = await newModel.create({
      genre,
      title,
      artist_name,
      album_name,
      art_work,
      audio_music,
    });
    data.save();
    res.send(data);
  } catch (error) {
    res.send({ status: error });
  }
});

app.get("/song-list", async (req, res) => {
  newModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/album-list", async (req, res) => {
  const agg = await newModel.aggregate([
    {
      $group: {
        _id: {
          artist: "$artist_name",
          album: "$album_name",
          artwork: "$art_work",
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: null,
        person: "$_id",
      },
    },
  ]);
  res.status(200).send({
    data: agg,
  });
});
app.post("/update", async (req, res) => {
  const { id, genre, title, artist_name, album_name, art_work, audio_music } =
    req.body;
  try {
    const data = await newModel.findByIdAndUpdate(
      { _id: id },
      {
        genre,
        title,
        artist_name,
        album_name,
        art_work,
        audio_music,
      }
    );
    res.status(200).send(data);
  } catch (error) {
    res.send({ status: error });
  }
});

app.post("/song-delete", async (req, res) => {
  const { id } = req.body;
  try {
    await newModel.findByIdAndDelete({ _id: id.id });
  } catch (error) {
    res.send({ status: error });
  }
});







app.listen(5000, () => {
    console.log("Server Started");
  });