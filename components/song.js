import Moment from 'react-moment';
import { useRecoilState ,useRecoilValue} from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { currentTrackId,isPlayingState } from '../atoms/songAtom'
import { useSession } from 'next-auth/react';
import {playState,playlist} from "../atoms/playlistAtom"
import {useEffect} from 'react'
const Song = ({song ,order}) => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession();
  const [currentId,setcurrentId] =useRecoilState(currentTrackId)
  const [isPlaying,setisPlaying] = useRecoilState(isPlayingState)
  const playid = useRecoilValue(playState)
  useEffect(()=>{
    if(session){
        if(session.error === "RefreshAccessTokenError"){
            signIn()
        }
                   
        spotifyApi.setAccessToken(session.user.accessToken)
    }
  },[playid])
  
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

 const playsong = ()=>{
        setcurrentId(song.track.id)
        setisPlaying(true)
       console.log(song.track.uri)
       if(spotifyApi.getAccessToken()){
        spotifyApi.play({
          uris:[song.track.uri]
        })
       }

      
 }
 console.log(currentId)

    return ( 
      <tbody onClick={playsong} className='text-extrabold hover:bg-gray-900 rounded-lg cursor-pointer'>
      <tr className="" >
        <td className="flex items-center  " >
        {order + 1}<img className="h-10 w-10 m-2 " src={song?.track?.album?.images?.[0]?.url}/>{song?.track?.name?.substring(0,70)}<br/>
         <p className='text-sm contents text-gray-400'>{song?.track?.artists?.[0]?.name}</p>
        </td>
        <td className='opacity-60 p-3 pr-10'>{song?.track?.album?.name?.substring(0,50)}</td>
        <td className='hidden md:inline opacity-60 p-2 pr-3'><Moment format="YYYY/MM/DD">{song?.added_at}</Moment></td>
        <td className='p-2 opacity-60'>{millisToMinutesAndSeconds(song?.track?.duration_ms)}</td>
      </tr>
   
    </tbody>
       
     );
}
 
export default Song;