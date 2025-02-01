import React from "react"
import {Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,ChakraProvider} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Link from "next/link"

import Text from "@/components/shared/Text/text"


function DrawerNav() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <div onClick={onOpen}>
            <img src='/images/svgs/burger.svg' />
        </div>

        <ChakraProvider >
                <Drawer  placement={'left'} colorScheme="#5730C1" size="full" onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody className="bg-[#020d1e]" >

                        <div onClick={onClose} className="w-[73px] bg-[#fff] float-right mt-4  rounded-[8px] justify-center flex items-center h-[40px]" > 
                            <p className="text-[#5730C1] font-rubi font-[500]">Close</p>
                        </div>
                        
                        <div className="h-[80vh]">
                            <div className=" mt-28 text-center">   
                            {links?.map((item)=>{
                            return (
                                <div>
                                    <Link onClick={onClose} href={item.path} key={item.id}>
                                        <Text 
                                            px='15px'
                                            py='25px'
                                            color='#fff'
                                            weight='500'
                                            family='urbanist'
                                            text= {item.name}
                                        />
                                            
                                    </Link>
                                </div>
                                
                            )
                        })}
                            </div>
                        </div>
                      
                       
                    </DrawerBody>
                </DrawerContent>
                </Drawer>
        </ChakraProvider>
      </>
    )
  }

  export default DrawerNav


  const links = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'About us',
      path: '/about',
    },
    {
      id: 3,
      name: 'Services',
      path: '#service',
    },
    {
      id: 4,
      name: 'Testimonials',
      path: '#testimonial',
    },
    {
      id: 5,
      name: 'Contact Us',
      path: '/contact',
    },
    // {
    //   id: 6,
    //   name: 'Login',
    //   path: '/login',
    // },
    // {
    //   id: 7,
    //   name: 'Sign Up',
    //   path: '/register',
    // },
  ];