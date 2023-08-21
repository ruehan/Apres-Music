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

        const { description, genre } = data;

        const fetchAlbumImg = await fetch('/api/songs/album_img', {
          method: 'POST',
          body: JSON.stringify({ songName, artist }),
          headers: {
              'Content-Type': 'application/json',
            },
        })

        const albumData = await fetchAlbumImg.json()

        console.log(albumData.results.trackmatches.track[0].image[2]['#text'])


        const fetchSubmit = await fetch('/api/songs/share_song', {
          method: "POST",
          body: JSON.stringify({artist, songName, description, genre}),
          headers: {
            "Content-Type": "application/json",
          }
        })

        router.push('/');

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

        console.log(artistData.rss.channel.item)

        const tmp_dt = artistData.rss.channel.item

        if(typeof(tmp_dt) == "object"){
          for(var key in tmp_dt){
            if(key === "image" || key === "relatedartistlist"){
              console.log(tmp_dt[key])
            }
          }
        }else{
          tmp_dt.map((item) => {
            console.log(item.title._cdata)
          })
        }

        let tempData = []

        // artistData.results.artistmatches.artist.map((artist) => {
          // tempData.push(artist.listeners)
        // })

        const val = Math.max.apply(null, tempData)

        // const firstData = artistData.results.artistmatches.artist[tempData.indexOf(String(val))]

        // console.log(firstData)

        // setArtistData([firstData])

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

        const fetchtext = await fetch('/api/text', {
          method: 'POST',
          body: JSON.stringify({ songName }),
          headers: {
              'Content-Type': 'application/json',
            },
      })

        // const songNameData = await fetchSongName.json()

        // console.log(songNameData)

        // console.log(songNameData.results.trackmatches.track)

        // setSongNameData(songNameData.results.trackmatches.track.slice(0, 3))


        const songtext = await fetchtext.json()

        console.log(songtext)
        // console.log(typeof(songtext))


        songtext.rss.channel.item.map((item) => {
          console.log(item.artist.name._cdata)
        })

        // console.log(songtext.rss.channel.item.title._cdata)
        // console.log(songtext.rss.channel.item.album.image._cdata)
      }
    
    
    if (!user) {
        return <div>Loading...</div>;
    }

    if (!user.isLoggedIn) {
      router.push('/log-in');
      return <div>Loading...</div>;
    }

    return ( 
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-items-center content-center items-center w-full" >
            <div className="w-2/6 h-12 m-8 flex ">
                <div className="w-24 text-center mr-4 flex items-center">가수 이름</div>
                <input {...register('artist', { required: "입력이 필요합니다." })} value={artist} placeholder="Artist Name" className="w-5/6 h-12 border-2 border-rose-600 pl-4" onChange={onChangeArtist} />
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
                <input {...register('song', { required: "입력이 필요합니다." })} value={songName} placeholder="Song Name" className="w-5/6 h-12 border-2 border-rose-600 pl-4" onChange={onChangeSongName}  />
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
                <input {...register('description', { required: "입력이 필요합니다." })} placeholder="Song Description" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button disabled className="w-16 ml-4"></button>
            </div>
            {errors.description && <span>{errors.description.message}</span>}
            
            <div className="w-2/6 h-12 m-8 flex">
                <div className="w-24 text-center mr-4 flex items-center">분위기</div>
                <input {...register('genre', { required: "입력이 필요합니다.", validate: { tag: (value) => value.includes("#") || "#을 붙여주세요. 예시) #발라드#조용한" } })} placeholder="Genre" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button disabled className="w-16 ml-4"></button>
            </div>
            {errors.genre && <span>{errors.genre.message}</span>}
            
            <input type="submit" className="w-1/6 h-12 bg-red-100 rounded-3xl" />
            </form>

            <div className="fixed top-16 left-4">
              
            </div>
        </div>
      );
}
