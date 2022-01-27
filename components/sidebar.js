import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon

}from "@heroicons/react/outline"
import { useSession,signOut } from "next-auth/react";
import { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import useSpotify from '../hooks/useSpotify'
import spotifyApi from "../lib/spotify";
import {playState} from "../atoms/playlistAtom"
const Sidebar = () => {

  const {data:session,status} = useSession()
  const [playlist,setPlaylist] = useState([])
  const [playid,setplayid] = useRecoilState(playState)
  const spotifyApi = useSpotify()
  useEffect(()=>{
       if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
              setPlaylist(data.body.items)
            })
       }
  },[session,spotifyApi])
 
console.log("you picked " + playid)

    return ( 

        <div className=" text-xs sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex p-5 lg:text-sm border-r border-gray-900 text-gray-400 overflow-y-scroll h-screen scrollbar-hide">
             <div className="space-y-4">
             <img  className="w-72 mb-5" src="https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/spotify-1.svg "/>
            
             <button className="flex items-center space-x-2 hover:text-white font-bold "> 
               <HomeIcon className="h-5 w-5"/>
             <p>Home</p>
             </button>
          
            
            
             <button className="flex items-center space-x-2 hover:text-white font-bold"> 
             <SearchIcon className="h-5 w-5"/>
               <p>Search</p>
               </button>
         
             <button className="flex items-center space-x-2 hover:text-white font-bold">
           
             <LibraryIcon className="h-5 w-5"/>
              <p>Library</p> 
            
             </button>
             <hr className="border-t-[0.1px] border-gray-900"/>

             <button className="flex items-center space-x-2 hover:text-white font-bold"> 
               <PlusCircleIcon className="h-5 w-5"/>
             <p>Create Playlist</p>
             </button>
          
            
            
             <button className="flex items-center space-x-2 hover:text-white font-bold"> 
             <HeartIcon className="h-5 w-5"/>
               <p>Liked Songs</p>
               </button>
         
             <button className="flex items-center space-x-2 hover:text-white font-bold">
           
             <RssIcon className="h-5 w-5"/>
              <p>Your Episodes</p> 
            
             </button>
             <hr className="border-t-[0.1px] border-gray-900"/>
                {playlist.map((play)=>(

                  <p onClick={()=>setplayid(play.id)} key={play.id} className="cursor-pointer hover:text-white font-semibold">{play.name}</p>
                ))}
           
             </div>
         
        </div>
     );
}
 
export default Sidebar;