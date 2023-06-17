import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import {db} from "../firebase"
import { arrayUnion,doc,updateDoc } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'

const Movie = ({item}) => {
const [like, setLikes] = useState(false)
const [saved,setSaved] = useState(false);
const {user} = UserAuth();


const movieID = doc(db,'users',`${user?.email}`)
const savedShows = async () => {
  if (user?.email) {
    setLikes(!like)
    setSaved(true)
    await updateDoc(movieID,{
      savedShows: arrayUnion({
        id:item.id,
        title: item.title,
        img: item.backdrop_path
      })
    })
  } else {
    alert("Please login to save a movie")
  }
}

  return (
    <div className='w-40 sm:w-52 lg:w-72 inline-block cursor-pointer relative p-2'>
                    <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white '>
                        <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center '>{item?.title}</p>
                      <p onClick={savedShows}>
                        {like ? <FaHeart className="absolute top-4 text-gray-300"/> : <FaRegHeart className="absolute top-4 text-gray-300"/>}</p>
                     </div>
                     
 </div> )        
                    
}


export default Movie
