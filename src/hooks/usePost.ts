// //to use this custom hook, do the following in the component to use it

// //1. import useStringArrayFetch from ''

// //const {data, loading, error} =  useStringArrayFetch (url, postData)
// //postData is whatever data you want to post

// //the data is an array, you can map through it
// //loading and error are both booleans, they return true or false

// //do your magic


// //NB: THIS COMPONENT CAN BE MODIFIED GOING ON TO SUIT REQUIREMENTS
// //but they will definitely do the same thing, you're safe


// import { useEffect, useState   } from "react";
// import axios from 'axios'

// //  const url = process.env.BASE_URL ?? ' ' ?? "https://fiyin-platinum.autobiz.app/SkyPay_index.php";
// const url = process.env.BASE_URL ?? ' ' ?? "http://localhost/SkyPay/index.php";

// function usePost (postData : any, dep?:any){

//     const [myData, setMydata] = useState<any>({});
//     const [isPending, setIsPending] = useState(true)
//     const [isError, setIsError] = useState(null)

//     useEffect(() => {
//         const post = async () => {
//           try {
//             const res = await axios.post(url, JSON.stringify(postData), {
//               headers: {
//                 'Content-Type': 'application/json'
//               }
//             });
//             if (res) { 
//               if (res.status == 200){
//               const dataArray = res?.data;
//               setMydata(dataArray);
//               setIsPending(false)
//               setIsError(null)             
//              }

//             }
//           } catch (err: any ) {
//             console.log(err.message);
//             setIsPending(false)
//             setIsError(err.message)
//           }
//         }
      
//         post();
//     }, [dep]);

//     return {
//         myData,
//         isError,
//         isPending
//     }
// }

// export default usePost



import { useEffect, useState } from "react";
import axios from 'axios';

const url = process.env.BASE_URL ?? "http://localhost/SkyPay/index.php";

function usePost(postData: any, dep?: any) {
  const [myData, setMydata] = useState<any>({});
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const post = async () => {
      try {
        setIsPending(true); // Set loading to true before making the request

        const res = await axios.post(url, JSON.stringify(postData), {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (res && res.status === 200) {
          const dataArray = res?.data;
          setMydata(dataArray);
          setIsPending(false);
          setIsError(null);
        }
      } catch (err: any) {
        console.log(err.message);
        setIsPending(false);
        setIsError(err.message);
      }
    };

    post();
  }, [dep]);

  return {
    myData,
    isError,
    isPending
  };
}

export default usePost;
