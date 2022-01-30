import { client } from './index.js';

export async function UpdateMovieById(id) {
  return await client.db('newdb').collection('movies').updateMany({ id: id }, { $set: { rating: 7 } });
}

export async function DeleteMovieById(id) {
    return await client.db('newdb').collection('movies').deleteMany({ id: id });
  }
export async function GetAllMovies() {
    return await client.db('newdb').collection('movies').
      find({}).toArray();
  }
  
export  async function GetMoviesbyParams(filters) {
    return await client.db('newdb').collection('movies').find(filters).toArray();
  }
  
export async function InsertNewMovie(data) {
    return await client.db('newdb').collection('movies').insertMany(data);
  }
  
export  async function getMoviebyID(id) {
    return await client.db('newdb').collection('movies').find({ id: id }).toArray();
  }