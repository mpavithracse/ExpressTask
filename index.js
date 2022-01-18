//const express = require('express')  //common JS type
import { MongoClient} from 'mongodb' //module type
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); //to get all the env keys
const app = express()
const PORT =9000;
const movies = [
    {
      "id" :"101",
      "name": "RRR",
      "poster":
        "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
      "rating": 8.8,
      "summary":
        "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
      "trailer": "https://www.youtube.com/embed/f_vbAtFSEc0",
      "language" : "telugu"
    },
    {
      "id":"102",
      "name": "Iron man 2",
      "poster":
        "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
      "rating": 7,
      "summary":
        "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
      "trailer": "https://www.youtube.com/embed/wKtcmiifycU",
      "language" : "english"
    },
    {
      "id" :"103",
      "name": "No Country for Old Men",
      "poster":
        "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
      "rating": 8.1,
      "summary":
        "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
      "trailer": "https://www.youtube.com/embed/38A__WT3-o0",
      "language" : "english"
    },
    {
      "id" :"104",
      "name": "Jai Bhim",
      "poster":
        "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    "summary":
        "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
      "rating": 8.8,
    "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA",
    "language" : "tamil"

    },
    {
      "id" :"105",
      "name": "The Avengers",
      "rating": 8,
      "summary":
        "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
      "poster":
        "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
      "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
      "language" : "english"
    },
    {
      "id" :"106",
      "name": "Interstellar",
      "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
      "rating": 8.6,
      "summary":
        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
      "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E",
      "language" : "english"
    },
    {
      "id" :"107",
      "name": "Baahubali",
      "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
      "rating": 8,
      "summary":
        "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
      "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI",
      "language" : "telugu"
    },
    {
      "id" :"108",
      "name": "Ratatouille",
      "poster":
        "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
      "rating": 8,
      "summary":
        "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
      "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w",
      "language" : "english"
    }
  ];
  
app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL= process.env.MONGO_URL;

app.get('/', function (req, res) {
  res.send('Hello World **??*')
})

async function CreateConnection(){
  const client = new MongoClient(MONGO_URL)
  await client.connect()
  console.log('connection established');
  return client;
}

const client= await CreateConnection();

//get movies using params
 app.get('/movies',async (req, res) => {
console.log(req.query)
const {language, rating}=req.query;
const filters = req.query;
if(filters.rating){
  filters.rating = +filters.rating;
}
const movieslist = await client.db('newdb').collection('movies').
find(filters).toArray();
movieslist.length!=0 ? res.send(movieslist) : res.status(404).send({msg:"Movies not available"})
})


//get movies using ID
app.get("/movies/:id",  async(req, res)=> {
    const {id}= req.params;
    const movie = await client.db('newdb').collection('movies').find({id:id}).toArray();
    console.log(movie);
    movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
})


//to post data to db
app.post('/movies', express.json() ,async(req, res) =>{
  req.headers['content-type'] = 'application/json';
  const data = req.body;
  console.log( "data is " + JSON.stringify( data));
 const result = await client.db('newdb').collection('movies').insertMany(data);
 res.send(result);
})


//get all the movies
app.get('/movies', async(req, res) =>{
  const movie = await client.db('newdb').collection('movies'). 
  find({}).toArray();
  movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
})


//delete all the movies
app.delete("/movies/:id",  async(req, res)=> {
  const {id}= req.params;
  const movie = await client.db('newdb').collection('movies').deleteMany({id:id});
  console.log(movie);
  movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
})

//Update all the movies
app.put("/movies/:id",  async(req, res)=> {
  const {id}= req.params;
  const movie = await client.db('newdb').collection('movies').updateMany({id:id}, {$set:{rating:7}});
  console.log(movie);
  movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
})

app.listen(PORT,()=>console.log("The server is started",PORT))