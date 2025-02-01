import React from 'react';
import { useState } from "react";
import {
  useTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  DrawerHeader,
} from "./utils";
import Link from "next/link";
import { AuthContext } from "@/context/authcontext/authcontext";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { paths } from '../../../../utils/data';
import { ListItemIcon } from '@mui/material';

interface NavProps {
  handleClick:string
}

const Navbar = ({handleClick}:NavProps) => {
    const auth = React.useContext(AuthContext);
    const userInfo = auth?.userData;
    const signOut = auth?.handleLogout
    const router = useRouter()
  
    const theme = useTheme();
    const [open, setOpen] = useState(false);
  
    const handleSignOut = () =>{
      signOut()
      router.push('/login')
    }
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    const accordionStyle = {
      background: "transparent",
      boxShadow: "none",
      color: "rgba(255, 255, 255, 1)",
      border: "none",
      marginBottom:'16px'
    };


  return (
    <div className={`z-[888] w-[75%] md:w-[30%] lg:w-[17%] fixed h-screen transition-all ease-in-out duration-500  ${open? 'translate-x-0':'translate-x-[-20rem]'} lg:translate-x-0`}>
    <div className="bg-[#020d1e] h-[100%] w-full ">
      <DrawerHeader>
        <div className="mt-4 mb-6">
          <img src="/images/png/LOGOF.png" className='h-[55px] w-[200px]' alt="logo" />
        </div>
        {/* <Typography sx={{color:'#fff'}}>Skypay</Typography> */}
        {/* <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton> */}
      </DrawerHeader>
      {/* <Divider /> */}
      <div className="flex h-[80vh] flex-col">
        <Box>
          <List sx={{color:'#fff'}}>
            {paths?.map((item, index) => {
              return (
                <>
                  {"children" in item ? (
                    <Accordion style={accordionStyle}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="info" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{display:'flex', }}
                      >
                        <img src="images/png/services.png" alt="" />
                        <Typography sx={{color:'#fff', fontWeight:'600', ml:1}}>{item.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {item.children?.map((link, index) => (
                          <div key={index} className="flex flex-col pl-3">
                            <Link onClick={handleDrawerClose} className="py-2 text-[#fff]" href={link.link}>
                              {link.title} <ArrowRightAltIcon />
                            </Link>
                          </div>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <Link className='mb-8' onClick={handleDrawerClose} href={item.link} key={index}>
                      <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            color:'#fff'
                          }}
                        >
                          {/* {
                              <Image/>
                            } */}
                          <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              <img src={item.icon} alt='icon'/>
                            </ListItemIcon>
                          <ListItemText
                            primary={item.name}
                            sx={{ opacity: 1 , color: "#fff", fontWeight: '500', fontSize:'14px', ml:1 }}
                          >{item.name}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  )}
                </>
              );
            })}
          </List>
        </Box>   

        <div className="flex gap-6 flex-col px-4">
          <Link href='' className="font-int text-[16px] text-[#fff] flex items-center"><img src="/images/png/vectorhelp.png" className='' alt="icon" /> <span className='ml-1'>Contact Support</span></Link>
          <div className="cursor-pointer " onClick={handleSignOut}>
            <p className="font-int text-[16px] text-[#fff]"> <Logout fontSize="small" /><span className='ml-1'>Logout</span> </p>                  
          </div>

        </div>


      </div>

    </div>
  </div>
  )
}

export default Navbar