//to use this custom hook, do the following in the component to use it

//1. import useStringArrayFetch from ''
//const {data, loading, error} =  useStringArrayFetch (url)

//the data is an array, you can map through it
//loading and error are both booleans, they return true or false

//do your magic


//NB: THIS COMPONENT CAN BE MODIFIED GOING ON TO SUIT REQUIREMENTS
//but they will definitely do the same thing, you're safe


import { useEffect, useState } from 'react';

function useStringArrayFetch(url : string) {


  const dataType : string [] = []

  const [data, setData] = useState(dataType);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err : any) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useStringArrayFetch;
