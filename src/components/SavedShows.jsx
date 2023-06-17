import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import {AiOutlineClose} from "react-icons/ai"

const SavedShows = () => {
    const [movies,setMovies] = useState([])
  const  {user}  = UserAuth()

 useEffect(()=> {
    onSnapshot(doc(db,"users",`${user?.email}`), (doc)=>{
        setMovies(doc.data()?.savedShows)
 })
 },[user?.email])

 const movieRef = doc(db,'users',`${user?.email}`)
 const deleteShow = async (passedID) => {
    try {
        const result = movies.filter((item)=> item.id !== passedID)
        await updateDoc(movieRef,{
            savedShows:result,
        })
    } catch (error) {
        console.log(error)
    }
 }
  
  return (
    <>
       <h2 className='text-white font-bold md:text-xl'>My Shows</h2>
      <div className='relative flex items-center'>
     <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap  scroll-smooth relative'>
         {
            movies.map((item,id)=>(
                <div className='w-40 sm:w-52 lg:w-72 inline-block cursor-pointer relative p-2'>
                <img className='w-full h-auto block my-96' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 text-white '>
                    <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center '>{item?.title}</p>
                 <p onClick={()=>deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4 my-96'><AiOutlineClose  /></p>
                 </div>
            </div>
            ))
         }
     </div>
      </div>
    </>
  )
}

export default SavedShows
