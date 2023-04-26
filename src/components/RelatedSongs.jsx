import SongBar from './SongBar'

export default function RelatedSongs({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) {
  return(
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>
        Related Songs:
      </h1>
      <div className='mt-6 w-full flex flex-col'>
        {data?.map((song, index) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={index}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick} />
        ))}
      </div>
    </div>
  )
};
