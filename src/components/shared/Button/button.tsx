import React from 'react'


interface props{
  width: string | number
  height? :  string | number
  px? : string
  py? :string
  bgcolor: string,
  family?: string
  textColor: string
  text : string
  border ? :string 
  fontWeight ?  : string | number
  fontsize ? : string | number
  rounded? : string
 }

function Button(

    {
      width,
      height,
      px,
      py,
      bgcolor,
      textColor,
      text,
      border,
      fontWeight,
      fontsize,
      family,
      rounded
    } :props) {

  return (
    <button

      style={{
        width: width,
        height :height,
        paddingBlock : py,
        paddingInline :px,
        backgroundColor :bgcolor,
        color : textColor,
        border: border,
        fontWeight : fontWeight,
        fontSize :fontsize,
        fontFamily: family,
        borderRadius:  rounded,
        cursor: "pointer"
      }}

    >

      {text}

    </button>
  )
}

export default Button