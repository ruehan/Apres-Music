import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Share() {

    const { data: user, error: userError } = useSWR('/api/user', fetcher);

    const router = useRouter();

    const [artist, setArtist] = useState('')
    const [artistData, setArtistData] = useState([])

    const [songName, setSongName] = useState('')
    const [songNameData, setSongNameData] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const onSubmit = async data => {
        const fetchSubmit = await fetch('/api/songs/share_song', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          }
        })

      };

      const onChangeArtist = (e) => {
        setArtist(e.target.value)
        
      }

      const onChangeSongName = (e) => {
        setSongName(e.target.value)
        
      }

      const onClickArtist = async () => {

        console.log(JSON.stringify(artist))

        const fetchArtist = await fetch('/api/songs/artists', {
            method: 'POST',
            body: JSON.stringify({ artist }),
            headers: {
                'Content-Type': 'application/json',
              },
        })

        const artistData = await fetchArtist.json()

        console.log(artistData.results.artistmatches.artist)

        setArtistData(artistData.results.artistmatches.artist.slice(0, 3))
      }

      const onClickSongName = async () => {

        console.log(JSON.stringify(songName))

        const fetchSongName = await fetch('/api/songs/song_names', {
            method: 'POST',
            body: JSON.stringify({ songName, artist }),
            headers: {
                'Content-Type': 'application/json',
              },
        })

        const songNameData = await fetchSongName.json()

        console.log(songNameData)

        console.log(songNameData.results.trackmatches.track)

        setSongNameData(songNameData.results.trackmatches.track.slice(0, 3))
      }
    
    
    if (!user) {
        return <div>Loading...</div>;
    }

    return ( 
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-items-center content-center items-center w-full" >
            <div className="w-2/6 h-12 m-8 flex ">
                <div className="w-24 text-center mr-4 flex items-center">가수 이름</div>
                <input {...register('artist', { required: "This field is required" })} value={artist} placeholder="Artist Name" className="w-5/6 h-12 border-2 border-rose-600 pl-4" onChange={onChangeArtist} />
                <div className="bg-gray-200 w-16 pl-2  ml-4 rounded-2xl flex items-center" onClick={onClickArtist}>검색</div>
            </div>
            <div className="flex justify-items-center content-center items-center ml-8">
                {artistData ? artistData.map((artist) => (
                        <p key={artist.name} className="mr-4 active:text-red-400 active:font-bold" onClick={e => setArtist(e.target.innerText)}>{artist.name}</p>
                )) : null
                }
            </div>
            {errors.artist && <span>{errors.artist.message}</span>}
            
            <div className="w-2/6 h-12 m-8 flex ">
                <div className="w-24 text-center mr-4 flex items-center">곡 이름</div>
                <input {...register('song', { required: "This field is required" })} value={songName} placeholder="Song Name" className="w-5/6 h-12 border-2 border-rose-600 pl-4" onChange={onChangeSongName}  />
                <div className="bg-gray-200 w-16 pl-2  ml-4 rounded-2xl flex items-center" onClick={onClickSongName}>검색</div>
            </div>
            <div className="flex justify-items-center content-center items-center ml-8">
                {songNameData ? songNameData.map((song) => (
                        <p key={song.name} className="mr-4 active:text-red-400 active:font-bold" onClick={e => setSongName(e.target.innerText)}>{song.name}</p>
                )) : null
                }
            </div>
            {errors.song && <span>{errors.song.message}</span>}
            <div className="w-2/6 h-12 m-8 flex">
                <div className="w-24 text-center mr-4 flex items-center">곡 설명</div>
                <input {...register('description', { required: "This field is required" })} placeholder="Song Description" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button disabled className="w-16 ml-4"></button>
            </div>
            {errors.description && <span>{errors.description.message}</span>}
            
            <div className="w-2/6 h-12 m-8 flex">
                <div className="w-24 text-center mr-4 flex items-center">장르</div>
                <input {...register('genre', { required: "This field is required" })} placeholder="Genre" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button disabled className="w-16 ml-4"></button>
            </div>
            {errors.genre && <span>{errors.genre.message}</span>}
            
            <input type="submit" className="w-1/6 h-12 bg-red-100 rounded-3xl" />
            </form>
        </div>
      );
}
