import {Error, Loader, SongCard} from '../components';
import { genres } from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import  {useDispatch, useSelector} from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';


export default function Discover() {
  const dispatch = useDispatch();
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

  return(
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
       <h2 className='font-bold text-3xl text-white'>Discover {genreTitle}</h2>
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


