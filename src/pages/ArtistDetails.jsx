import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

export default function ArtistDetails() {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  

  if (isFetchingArtistDetails) return <Loader title ="Loading artist details"/>;

  if (error) return <Error/>;

  if (!artistData) <div>Loading...</div>;

  let bioWithoutDots;
  try {
    bioWithoutDots = artistData?.data[0]?.attributes?.artistBio.replace(/(\u2219|\u2022|\u2023|\u25E6|\u2043|\u2218)\s*/g, '');
  } catch(e) {
    bioWithoutDots = null;
  }
  

  
  return(
    <div className="flex flex-col mt-8">
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"/>
          <div className="absolute inset-0 flex items-center">
            <img src={artistId ? artistData?.data[0]?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
            :
            artistData?.data[0]?.avatar}
            alt="art" 
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"/>
            <div className="ml-5">
              <p className="font-bold sm:text-3xl text-xl text-white">
                {artistId ? artistData?.data[0]?.attributes?.name : ''}
              </p>
              <p className="text-base text-gray-400 mt-2">
                {artistId ?
                artistData?.data[0]?.attributes?.genreNames[0]
                :
                ''}
              </p>
            </div>
          </div>
          <div className="w-full sm:h-20 h-12"/>
          
      </div>
      {bioWithoutDots ? <p className=" lg:w-3/4 mt-5 text-gray-400 text-base leading-7" dangerouslySetInnerHTML={{__html: bioWithoutDots}}></p> 
      :
      <p className=" lg:w-3/4 mt-5 text-gray-400 text-base">No description available for artist.</p>}
      
    </div>
  )
};

