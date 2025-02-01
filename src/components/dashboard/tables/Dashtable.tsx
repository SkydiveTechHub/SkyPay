import React, { useContext, useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import usePost from '@/hooks/usePost'
import { AuthContext } from '@/context/authcontext/authcontext'

const Dashtable = () => {
    const auth = useContext(AuthContext)
    const api_key = auth?.userData?.api_key
    const [data, setData] = useState<any>([])
    const {myData} = usePost({
        "process": "tp_transaction_history",
        "api_key": api_key,
        "action_check": "recharge_history"
    
    })

    useEffect(()=>{
        const result = myData?.data
        setData(result?.slice(0, 10))
    },[myData])
  return (

    <TableContainer>
        <Table variant='simple' >
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead sx={{backgroundColor:'rgba(105, 215, 250, 0.39)', color:'#1E0029', height:'50px'}}>
            <Tr sx={{py:3}}>
                <Th sx={{width:'10%', fontWeight:'600', fontSize:'16px', fontFamily:'Inter'}}>ID</Th>
                <Th sx={{width:'10%', fontWeight:'600', fontSize:'16px', fontFamily:'Inter'}}>Date</Th>
                <Th sx={{width:'10%', fontWeight:'600', fontSize:'16px', fontFamily:'Inter'}}>Time</Th>
                <Th sx={{width:'10%', fontWeight:'600', fontSize:'16px', fontFamily:'Inter'}} isNumeric>Amount</Th>
                <Th sx={{width:'10%', fontWeight:'600', fontSize:'16px', fontFamily:'Inter'}} >Response</Th>
                <Th sx={{width:'10%', fontWeight:'600', fontSize:'16px', fontFamily:'Inter'}}>Status</Th>
            </Tr>
            </Thead>
            <Tbody>
                {
                    data?.map((item:any, id:any)=>{
                        const dateTime = item?.date_added?.split(" ")
                        const date = dateTime[0]
                        const time = dateTime[1]
                        return(
                            <Tr key={id} sx={{height:'40px', borderBottom:'1px solid #E8E8E8', fontSize:'14px', fontFamily:'Inter', color:'#333333'}}>
                                <Td>{item?.vendor_id}</Td>
                                <Td>{date}</Td>
                                <Td>{time}</Td>
                                <Td isNumeric>N{item?.amount}</Td>
                                <Td>{item?.true_response}</Td>
                                <Td>{item?.status}</Td>
                            </Tr> 
                        )
                    }
                       
                    )
                }


            </Tbody>
            
        </Table>
    </TableContainer>

  )
}

export default Dashtable
