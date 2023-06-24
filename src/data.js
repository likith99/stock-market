import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetchData = (...stockname) => {
  
  const [edata,setEdata]=useState(null)
  const API_key="37OFH3IJN5ZA5VQO"
  const fetchData=()=>{
    const endpoints=stockname.map((eq)=>`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${eq}.BSE&outputsize=full&apikey=${API_key}`)

    axios.all(endpoints.map((endpoint)=>axios.get(endpoint))).then(axios.spread((...allData)=>{
      const everydata=allData
      setEdata(everydata)
    }))
  }
  useEffect(()=>{
    fetchData()
  },[])
  
  if (edata){
    return {
      edata
    };
  }
  
};

export default useFetchData;



  // axios.all(endpoints.map((endpoint)=>axios.get(endpoint))).then((data)=>console.log(data))
  // axios.all(endpoints.map((endpoint)=>axios.get(endpoint))).then(axios.spread((...allData)=>{console.log(data1,data2)}))
  // Promise.all(endpoints).then(
  //   axios.spread((...allData) => { 
  //     setEdata(allData)
  //   })
  // )