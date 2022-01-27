import { useRecoilValue } from "recoil";
import {playState,playlist} from "../atoms/playlistAtom"
import Song from './song'
const Songs = () => {
    const playl = useRecoilValue(playlist)
    return ( 
        
      
        <table className="table-fixed text-white border-separate my-table-spacing shadow-md text-lg">
        <thead>
        <tr>
          <th>Title</th>
          <th>Album</th>
          <th className="hidden md:inline p-2">Added At</th>
          <th>Duration</th>
        </tr>
      </thead>
    
        {playl?.tracks?.items.map((song,i)=>(
          
          
               <Song key={song.id} order={i} song = {song}/>
           
        

        ))}
        
        </table>
      
       
    
     );
}
 
export default Songs;