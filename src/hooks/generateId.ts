//to use this custom hook, do the following in the component to use it

//1. import useStringArrayFetch from ''

//const {data, loading, error} =  useStringArrayFetch (url, postData)
//postData is whatever data you want to post

//the data is an array, you can map through it
//loading and error are both booleans, they return true or false

//do your magic


//NB: THIS COMPONENT CAN BE MODIFIED GOING ON TO SUIT REQUIREMENTS
//but they will definitely do the same thing, you're safe


import { useEffect, useState   } from "react";
import { v4 as uuidv4 } from 'uuid';

// const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
const url = process.env.BASE_URL ?? ' ' ?? "http://localhost/SkyPay/index.php";

function GenerateID (trigger:boolean){

  // console.log(postData)

    const [id, setID] = useState<any>({});
    const [isPending, setIsPending] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
      if(trigger){
        const uniqueId = uuidv4();
        const id_arr = uniqueId.split('-')
        setID('tp'+id_arr.pop())        
      }


    }, [trigger]);

    return {
        id,
        isError,
        isPending
    }
}

export default GenerateID