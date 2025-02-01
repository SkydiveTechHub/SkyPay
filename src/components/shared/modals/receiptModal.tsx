import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
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
    provider?:string | undefined;
    source?:string;
    amount?:number;
    after_balance?:string;
    phone?:string;
    quantity?:string;
    status?:string;
    date?:string;
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
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};



 const ReceiptModal:React.FC<ModalProps> = ({children, open, onClose, provider, source, amount, after_balance, phone, quantity, status, date }) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  
  const generatePdf = async () => {
    const elementsToCapture = document.getElementsByClassName('receipt');
    const ele = document.getElementById('receipt')
    if (elementsToCapture.length > 0) {
      const elementToCapture = elementsToCapture[9] as HTMLElement;
  
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(elementToCapture);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 150); 
      pdf.save('Receipt.pdf');
      
      onClose();
    }else{
      console.log(ele)
      const elem = ele as HTMLElement
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(elem);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 150); 
      pdf.save('Receipt.pdf');
      
      // onClose();

    }
  };
  
  const generatePng = async () => {
    const elementsToCapture = document.getElementsByClassName('MuiBox-root');
    
    if (elementsToCapture.length > 0) {
      console.log(elementsToCapture)
      const elementToCapture = elementsToCapture[9] as HTMLElement;

      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(elementToCapture);
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'Receipt.png';
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      onClose()
    }
  };
  

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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

        <div id='receipt' className='text-center flex flex-col items-center gap-2 mx-auto h-90 mt-[-35px]'>
          <img src="/images/svgs/LOGO.svg" alt="logo" />
          <h1 style={{ color: "rgba(34, 52, 127, 1)" }} className='font-inter font-[700] text-[18px]'> TRANSACTION RECEIPT  </h1>
          <p style={{ color: "rgba(34, 52, 127, 1)" }} className='font-inter font-[400] text-sm'> Thank you for choosing us! Kindly reach out to us if the value of this transaction is not recieved.  </p>

  <div className='space-y-2  my-10 text-[rgba(0, 0, 0, 1)]'>
              <div className='flex justify-between items-center gap-32'>
                  <span className='text-sm'>Product</span>
                  <span className='text-sm font-[500]'>{provider?.toUpperCase()}</span>
              </div>
              <div className='flex justify-between items-center gap-32'>
                  <span className='text-sm'>Source</span>
                  <span className='text-sm font-[500]'>{source}</span>
              </div>
              <div className='flex justify-between items-center gap-32'>
                  <span className='text-sm' >Amount Charged</span>
                  <span className='text-sm font-[500]'>₦ {amount}</span>
              </div>
              <div className='flex justify-between items-center gap-32'>
                  <span className='text-sm'>After Balance</span>
                  <span className='text-sm font-[500]'>{after_balance}</span>
              </div>
              <div className='flex justify-between items-center gap-32'>
                  <span className='text-sm'>Phone Number</span>
                  <span className='text-sm font-[500]'>{phone}</span>
              </div>
              <div className='flex justify-between items-center gap-32'>
                  <span className='text-sm'>Date / Time</span>
                  <span className='text-sm font-[500]'>{date}</span>
              </div>
              <div className='flex justify-between items-center gap-32'>
                  <span className='text-sm'>Status</span>
                  <span className='text-sm font-[500]'>{status}</span>
              </div>
              {children}
          </div>
        </div>

            

            <div className='flex justify-left gap-4 w-full'>
                <button onClick={generatePdf} type='button'style={{backgroundColor: 'rgba(254, 7, 7, 1)', color:'rgba(255, 255, 255, 1)'}} className='w-[50%] py-2 rounded-lg font-int font-[700] text-sm'> Dowload As PDF </button>

`                 <button onClick={generatePng} type='button'style={{backgroundColor: 'rgba(40, 192, 241, 1)', color:'rgba(255, 255, 255, 1)'}} className='w-[50%] py-2 rounded-lg font-int font-[700] text-sm'>Download As PNG</button>
              </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ReceiptModal