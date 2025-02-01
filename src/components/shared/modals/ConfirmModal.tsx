import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

interface ModalProps{
    children: React.ReactNode;
    // openModal: ()=>void;
    open: boolean;
    onClose: ()=>void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '30px',
  boxShadow: 24,
  p: 4,
};

 const ConfirmModal:React.FC<ModalProps> = ({children, open, onClose}) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  
  
  
  return (
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <div className=" flex justify-end
                  self-end
                  
                  mb-6
                  bg-Black font-extrabold">
          <button className="cursor-pointer" onClick={onClose}
>
            <img src="/images/png/close.png" alt=""  />
          </button>
        </div>
            <div className='flex items-center justify-center flex-col gap-6'>
                  <div>
                      <img src="/images/png/thumbsUP.png" alt="" width='100px'/>
                  </div>
                  {
                    children
                  }
                  <div className='flex justify-between items-center w-full'>
                      {/* <button type='button' onClick={generatePng} style={{backgroundColor: 'rgba(29, 191, 65, 1)', color:'rgba(255, 255, 255, 1)'}} className='w-[150px] py-2 rounded-lg font-int text-[14px] font-[600]'>Download</button> */}
                      {/* <Link href='/dashboard'>
                          <button type='button' style={{backgroundColor: 'transparent', color:'rgba(103, 103, 103, 1)', border: '1px solid rgba(215, 70, 50, 1)'}} className='w-[150px] text-[14px] py-2 rounded-lg font-int font-[600] '>Return Home</button>
                      </Link> */}
                  </div>

              </div>
          </Box>
        </Fade>
      </Modal>
  );
}

export default ConfirmModal