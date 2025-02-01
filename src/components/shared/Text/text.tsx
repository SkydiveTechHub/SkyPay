import React from 'react'
import { Text } from '@chakra-ui/react'


interface props {
    text :string
    color : string
    weight? : string
    family :  string
    px? : string
    py? : string
}

function Mytext( 
    {
        text, 
        color , 
        weight, 
        family, 
        px , 
        py
    } : 
    props) {
  return (
    <div>
        <Text   
            fontSize={{ lg : "18px" , base : "16px" }}
            color={color}
            fontWeight={weight}
            fontFamily={family}
            px={px}
            py={py}
        >
            {text}
        </Text>
    </div>
  )
}

export default Mytext