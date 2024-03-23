import { useEffect, useState } from "react"

const Name = () => {
    const [data,setData] = useState([]);
    const RapidApiKey = '4fb2cb4b05msh06e028da46f0709p1cd5cbjsn043f2f5c9440'
    const RapidApiHost = 'weatherbit-v1-mashape.p.rapidapi.com'
    const lat = 35.5
    const lon = -78.5
    const fetchApi = async() =>{
        try {
            const response = await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${lon}`,{
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': RapidApiKey,
                    'X-RapidAPI-Host': RapidApiHost
                },
            });
            const result = await response.json();
            setData(result.data)
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        fetchApi();
        // eslint-disable-next-line
    },[])
    
  return (
    <div>
        {data.map((val,index)=>(
           <div key={index} className="bg-black">
             <ul className="text-white">
                <li>{val.temp}</li>
                <li>{val.wind_dir}</li>
             </ul> 
           </div>
        ))}
    </div>
  )
}

export default Name