import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa';

export default function PlayPause({isPlaying, activeSong, song, handlePause, handlePlay}) {
  return(
    <>
      {isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle 
        size={35}
        className=' text-gray-300 '
        onClick={handlePause}/>
      ) : (
        <FaPlayCircle 
        size={35}
        className=' text-gray-300 '
        onClick={handlePlay}/>
      )}
    </>
  )
};
