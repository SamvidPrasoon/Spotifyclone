import { ChevronRightIcon } from '@heroicons/react/outline';
import { useSession ,signOut} from 'next-auth/react';
import {shuffle} from 'lodash'
import { useState,useEffect } from 'react';
import {playState,playlist} from "../atoms/playlistAtom"
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/songs'
const colors = [

    'bg-gradient-to-b from-yellow-200 via-yellow-400 to-black',
    'bg-gradient-to-b from-green-200 via-green-400 to-black',
    'bg-gradient-to-b from-purple-200 via-purple-400 to-black',
    'bg-gradient-to-b from-yellow-200 via-yellow-300 to-black',
    'bg-gradient-to-b from-blue-700 via-blue-800 to-black',
    'bg-gradient-to-b from-orange-500 to-black',
    'bg-gradient-to-b from-sky-400 to-black',
    'bg-conic-to-b from-indigo-200 via-blue-gray-600 to-black',
    'bg-conic-to-b from-white via-sky-500 to-black',
]
const Center = () => {
  const { data: session } = useSession();
  const [color,setColor] = useState(null)
  const playid = useRecoilValue(playState)
  const [playl,setPlayl] = useRecoilState(playlist)
  const spotifyApi = useSpotify()

 console.log(spotifyApi)
 useEffect(()=>{
  if(session){
      if(session.error === "RefreshAccessTokenError"){
          signIn()
      }
                 
      spotifyApi.setAccessToken(session.user.accessToken)
  }
},[playid])
useEffect(()=>{
   setColor(shuffle(colors).pop())
 
},[playid])

 useEffect(()=>{ 
   if(spotifyApi.getAccessToken()){
    spotifyApi.getPlaylist(playid).then((data)=>{
      setPlayl(data.body)
    })
   }
      
 },[playid,spotifyApi])



console.log(playl)







return (
    <div className='  flex-grow h-screen overflow-y-scroll scrollbar-hide'>
    
      <div className='absolute top-5 right-8 '>
        <div className='flex items-center space-x-3 opacity-90  p-1 pr-2 hover:opacity-80 cursor-pointer bg-gray-900 rounded-full text-white '>
          <img
            className='rounded-full w-10 h-11 '
            src={session && session.user && session.user.image}
          />
          <h2 className='text-bold'>{session && session.user && session.user.name}</h2>
          <ChevronRightIcon className='h-5 w-5'/>
          <button onClick={()=>signOut()} className="flex items-center  hover:text-white font-bold pr-2"> 
          SignOut  

         </button>
        </div>
      </div>

      <div
        className={`h-80 flex items-end space-x-7 ${color}`}
      >
         <img className='m-4 h-52 w-52 rounded-r rounded-l shadow-2xl drop-shadow-2xl' src={playl?.images?.[0]?.url  || "https://hapakenya.com/wp-content/uploads/2021/02/spotify.jpg"} alt='image'/>
         <div className='mb-3'>
         <p className='text-white text-xl font-extrabold '>PLAYLIST</p>
         <h1 className='text-white text-3xl md:text-5xl font-bold mb-3'>{playl?.name}</h1>
         <p className=' text-white text-sm text-opacity-50 text-bold mb-2 hidden md:inline '>{playl?.description}</p>
         <p className='text-white text-sm  font-extrabold'>BY {playl?.owner?.display_name}  <span className='text-white text-sm  '>{playl?.tracks?.items.length} Songs</span></p>
         </div>
         </div>

         <div className='text-white'>
             <Songs/>
         </div>
         

        
    </div>
  );
};

export default Center;
