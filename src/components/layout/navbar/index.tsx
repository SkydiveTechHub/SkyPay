import * as React from "react";
import { useState, useEffect, ReactNode } from "react";
import {
  styled,
  useTheme,
  Theme,
  alpha,
  CSSObject,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  DrawerHeader,
} from "./utils";
import UserIcon from "./UserIcon";
import Link from "next/link";
import UserDetails from "./UserDetails";
import { AuthContext } from "@/context/authcontext/authcontext";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import isAuth from "@/pages/Protected";
import Navbar from "./navbar";

interface DrawerProps {
  children: ReactNode;
}

const MiniDrawer: React.FC<DrawerProps> = ({ children }) => {
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
  };

  return (
    <div className="flex w-full">
      <Navbar handleClick={''}/>

      <div className="flex flex-col w-full lg:w-[83%] lg:ml-[17%] " >

        <div className=" fixed z-[99] w-full lg:w-[83%] bg-[#e6f0ff]" >
            <Box sx={{ width:'' }}>
              </Box>
              <Toolbar
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 4,
                }}
              >
   
                  <div className="block lg:hidden">
                    {
                      !open?
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        // sx={{
                        //   marginRight: 5,
                        //   ...(open && { display: "none" }),
                        // }}
                      >
                        <MenuIcon />
                      </IconButton>                    
                    
                    :

                      <IconButton
                        color="inherit"
                        aria-label="Close drawer"
                        onClick={handleDrawerClose}
                        edge="start"
                        // sx={{
                        //   marginRight: 5,
                        //   ...(open && { display: "none" }),
                        // }}
                      >
                        <CloseIcon />
                      </IconButton>                    
                     
                    }
                    </div>

                  

                  <div className="hidden lg:block">
                    {/* <UserDetails /> */}
                  </div>


                
                <Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {/* <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={4} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton> */}
                    <div className="hidden md:flex w-full justify-end mb-[3px] pr-2">
                      <div className="flex items-center border border-[#28C0F1] rounded-md p-1 w-[400px] gap-1">
                        <p className='font-[inter] text-[10px]' style={{color:'#000', fontWeight:'700'}}><span className="text-[#28C0F1] font-[700]">Referral Link:</span><span style={{color:'#000', fontWeight:'400'}}>{`https://Skypay.com.ng/0/Register.php?referral=${userInfo?.referral_code}`}</span></p>
                        <img src="/images/svgs/copy.svg" className="h-[20px] w-[18px]" alt="copy icon" />                
                      </div>


                    </div>

                    <Box>
                      <UserIcon />
                    </Box>
                  </Box>
                </Box>

        

            </Toolbar>


            
        </div>
        <Box
          // component="main"
          onClick={handleDrawerClose}
          sx={{
            flexGrow: 1,
            // p: 6,
            backgroundColor: "#fff",
            minHeight: "100vh",
          }}
        >
          {/* <DrawerHeader /> */}
          <Box sx={{ mt: 2, width: "100%", overflowX:'hidden' }}>
            <div style={{
              backgroundImage: 'url(/images/png/bg.avif)',
              backgroundRepeat:'no-repeat',
              backgroundSize:'cover',
              backgroundPosition:'center',
              height:'100%'
              
            }} className="p-2 lg:p-6 mt-10">
              {children}
            </div>
            
          </Box>
        </Box>        
      </div>

    </div>
  );
};

export default isAuth(MiniDrawer);


