import express from 'express';
import { UpdateMovieById ,DeleteMovieById,GetAllMovies,GetMoviesbyParams,InsertNewMovie,getMoviebyID } from '../helper.js';

const router = express.Router();

router.get('/',async (req, res) => {
    console.log(req.query)
    const {language, rating}=req.query;
    const filters = req.query;
    if(filters.rating){
      filters.rating = +filters.rating;
    }
    const movieslist = await GetMoviesbyParams(filters);
    movieslist.length!=0 ? res.send(movieslist) : res.status(404).send({msg:"Movies not available"})
    });
    
    
//get movies using ID
router.get("/:id",  async(req, res)=> {
        const {id}= req.params;
        const movie = await getMoviebyID(id);
        console.log(movie);
        movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
    })
    
    
    //to post data to db
router.post('/', express.json() ,async(req, res) =>{
      req.headers['content-type'] = 'application/json';
      const data = req.body;
    const result = await InsertNewMovie(data);
     res.send(result);
    })
    
    
    //get all the movies
router.get('/', async(req, res) =>{
      const movie = await GetAllMovies();
      movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
    })
    
    
    //delete all the movies
router.delete("/:id",  async(req, res)=> {
      const {id}= req.params;
      const movie = await DeleteMovieById(id);
      console.log(movie);
      movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
    })
    
    //Update all the movies
router.put("/:id",  async(req, res)=> {
      const {id}= req.params;
      const movie = await UpdateMovieById(id);
      console.log(movie);
      movie.length!=0 ? res.send(movie) : res.status(404).send({msg:"Movies not available"})
    })

export const moviesRouter =  router