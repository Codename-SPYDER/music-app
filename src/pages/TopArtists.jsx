
import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


export default function TopArtists() {
  const { isFetching, error } = useGetTopChartsQuery();
  let data;  
  try {
    data = useGetTopChartsQuery().data.filter(song => song.images && song.images.coverart);
  } catch (e) {
    data = false;
  }

  if (!data) return <div>Loading...</div>;

  if (isFetching) return <Loader title='Loading top charts'/>;

  if (error) return <Error/>;

  return(
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map(track => (
          <ArtistCard
            key={track.key}
            track={track}
          />
        ))}
      </div>
      
    </div>
  )
};



