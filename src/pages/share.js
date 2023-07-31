import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Share() {

    const { data: user, error: userError } = useSWR('/api/user', fetcher);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
      const onSubmit = data => {
        // Your POST request here
      };
    
    
    if (!user) {
        return <div>Loading...</div>;
    }

    return ( 
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-items-center content-center items-center w-full" >
            <div className="w-2/6 h-12 m-8 flex ">
                <div className="w-24 text-center mr-4 flex items-center">가수 이름</div>
                <input {...register('artist', { required: "This field is required" })} placeholder="Artist Name" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button className="bg-gray-200 w-16 ml-4 rounded-2xl">검색</button>
            </div>
            {errors.artist && <span>{errors.artist.message}</span>}
            
            <div className="w-2/6 h-12 m-8 flex ">
                <div className="w-24 text-center mr-4 flex items-center">곡 이름</div>
                <input {...register('song', { required: "This field is required" })} placeholder="Song Name" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button className="bg-gray-200 w-16 ml-4 rounded-2xl">검색</button>
            </div>
            {errors.song && <span>{errors.song.message}</span>}
            <div className="w-2/6 h-12 m-8 flex">
                <div className="w-24 text-center mr-4 flex items-center">곡 설명</div>
                <input {...register('description', { required: "This field is required" })} placeholder="Song Description" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button className="w-16 ml-4"></button>
            </div>
            {errors.description && <span>{errors.description.message}</span>}
            
            <div className="w-2/6 h-12 m-8 flex">
                <div className="w-24 text-center mr-4 flex items-center">장르</div>
                <input {...register('genre', { required: "This field is required" })} placeholder="Genre" className="w-5/6 h-12 border-2 border-rose-600 pl-4" />
                <button className="bg-gray-200 w-16 ml-4 rounded-2xl">검색</button>
            </div>
            {errors.genre && <span>{errors.genre.message}</span>}
            
            <input type="submit" />
            </form>
        </div>
      );
}
