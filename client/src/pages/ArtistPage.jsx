import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../axios";
import Track from "../components/Track/Track";
import {Link} from 'react-router-dom'
import environment from "../environment";

function ArtistPage({
                      audioRef,
                      selectTrack,
                      playTrack,
                      pauseTrack,
                      addToFavorite,
                      removeFromFavorite,
                      favoriteList,
                      onClickArtist
                    }) {
  const [artist, setArtist] = useState({})
  const params = useParams()

  useEffect(() => {
    const id = params.id
    axios.get(`/api/artist/${id}`).then(res => {
      console.log(res.data)
      setArtist(res.data)
    })
  }, [params.id]);

  return (
    <>
      <div className='d-flex m-2 bg-white p-3'>
        <img src={`${environment.API_URL}/${artist.image_url}`} alt='' className='rounded-2' width={150} height={150}/>
        <div className='m-3'>
          <h2>{artist.name}</h2>
          <div>{(artist.albums?.length ? artist.albums?.length : 0) + ' Альбомов'}</div>
          <div>{(artist.tracks?.length ? artist.tracks?.length : 0) + ' Треков'}</div>
        </div>
      </div>

      <div className='album-slider d-flex'>
        {artist.albums?.map((album) => {
          return (
            <Link to={`/album/${album.name.replaceAll(' ', '_')}/${album.id}`}>
              <div className='album-wrapper d-flex flex-column mx-2 p-2 rounded-3 shadow c-pointer' key={album.id}>
                <img src={`${environment.API_URL}/${album.image_url}`} alt='' className='rounded-2' width={200}/>
                <b>{album.name}</b>
                <b className='opacity-75'>{(() => {
                  const text = album.artists?.reduce((acc, artist) => acc + artist.name + ', ', '')
                  return text.substring(0, text.length - 2)
                })()}</b>
              </div>
            </Link>
          )
        })}
      </div>

      <div className='my-5'>
        <h2>Музыка {artist.name}</h2>
        <ul className='d-flex flex-column p-0'>
          {artist.tracks?.map((track, index) => (
            <Track
              key={index}
              index={index}
              track={track}
              audioRef={audioRef}
              selectTrack={selectTrack}
              currentList={artist.tracks}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              liked={favoriteList.includes(track)}
              onClickArtist={onClickArtist}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ArtistPage;