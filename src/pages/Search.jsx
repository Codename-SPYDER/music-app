

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";


export default function Search() {
  const { searchTerm }= useParams();
  const { activeSong, isPlaying} = useSelector(state => state.player);
  const { isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  let data;  
  try {
    data = useGetSongsBySearchQuery(searchTerm).data
  } catch (e) {
    data = false;
  }

  console.log(data);
  if (!data) return <div>Loading...</div>;

  const songs = data?.tracks?.hits?.map(song => song.track);

  if (isFetching) return <Loader title='Loading top charts'/>;

  if (error) return <Error/>;

  return(
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, index) => (
          <SongCard 
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={index}
          />
        ))}
      </div>
      
    </div>
  )
};



