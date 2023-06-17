import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaHeart, FaRegHeart} from "react-icons/fa"
import Movie from './Movie'

const Row = ({title,fetchURL}) => {
    const [movies,setMovies] = useState([])
    const [trailerurl, setTrailerUrl] = useState([""]);
    useEffect(()=>{
        axios.get(fetchURL).then((response)=>{
            setMovies(response.data.results)
            // console.log(response)
        })
    },[fetchURL]);
    
  return (
    <div>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center'>
     <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap 
      scroll-smooth relative'>
         {
            movies.map((movie,id)=>(
               <Movie key={movie.id} item={movie} />
            ))
         }
     </div>
      </div>
    </div>
  )
}

export default Row
 