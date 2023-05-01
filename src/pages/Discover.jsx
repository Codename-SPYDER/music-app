import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useState } from 'react';


export default function Discover() {
  const dispatch = useDispatch();
  const [help, setHelp] = useState(false);
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
  let data;  
  try {
    data = useGetSongsByGenreQuery(genreListId || 'POP').data.filter(song => song.images && song.images.coverart);
  } catch (e) {
    data = false;
  }
  

  if (!data) return <div>Loading...</div>;

  if(isFetching) return <Loader title="Loading songs..."/>;

  if (error) return <Error />;

  const genreTitle = genres.find(({value}) => value === genreListId)?.title;

  function toggleHelp() {
		setHelp(!help);
	}

  return(
    <div className='flex flex-col'>
      {help ? 
      (
        <div className="overflow-y-auto fixed w-full h-screen bg-[#5f2b8a]/60 flex flex-col justify-center items-center z-20 top-0 left-0">
		      <p className="bg-gray-100 mb-24 w-3/4 2xl:w-1/2 p-8 rounded-md xl:text-lg border-gray-400 border-2 max-[600px]:text-sm max-[600px]:p-3 max-[600px]:w-full max-[600px]:mb-10">
			      Hi, welcome to my spotify clone Webapp! <br/><br/> Allow me to provide you with a short tutorial.
			      You can view the top charts, top artists, and top songs in your country by selecting one of the pages on the left. 
			      You can also play and pause songs, if you wish to play the next song in your search simply skip to the next one.
			      Lyrics of songs can be found by selecting the song name and artist details can be found by clicking on the artists name.
            To seach for a specific song simply search in the bar above.<br/><br/> 
			      Please feel free to communicate any issues you face when using the application or improvements you would like to see through the Contact Me portion of my profile website.
			      Thanks again for stopping by!
			    </p>
          <button onClick={toggleHelp} className="text-lg w-1/2 text-white py-2 rounded-full bg-[#2f1545] border-white shadow-md hover:scale-95 ease-in-out duration-500">Back to Site</button>
        </div>
      ) : null}
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
       <h2 className='font-bold text-3xl text-white'>Discover {genreTitle}</h2>
       <div className='flex items-center'>
        <button onClick={toggleHelp}
			    className="bg-gray-100  rounded-md border-gray-400 hover:scale-90 ease-in-out duration-300 p-1.5 sm:mt-0 mt-5 mr-5">
			  	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  		  		<path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
			  	</svg>
			  </button>
        <select 
         onChange={(ev) => dispatch(selectGenreListId(ev.target.value))}
         value ={genreListId || 'pop'}
         className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>
         {genres.map(genre => (
         <option key={genre.value} value={genre.value}>
           {genre.title}
         </option>))}
        </select>
       </div>
      </div>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, index) => (
          <SongCard 
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i = {index}
            />
        ))}
      </div>
    </div>
  )
} 


