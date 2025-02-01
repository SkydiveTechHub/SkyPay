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
import usePost from '@/hooks/usePost';
import { AuthContext } from '@/context/authcontext/authcontext';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

interface ModalProps{
    // openModal: ()=>void;
    trans_id:number
    trans_type:string
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


 const TransactionModal:React.FC<ModalProps> = ({trans_id, trans_type, open, onClose}) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);'

  const auth = React.useContext(AuthContext);
  const api_key = auth?.userData?.api_key;

  const [open2, setOpen2] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState<any>({});
  
  const handleOpen = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen2(false);
  };

  const generatePdf = async () => {
    const elementToCapture = document.getElementById('element-to-capture');

    if (elementToCapture) {
      const canvas = await html2canvas(elementToCapture);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 150);
      pdf.save('generated-pdf.pdf');
    }
  };

  const {myData, isPending} = usePost({
    "process": "tp_transaction_history",
    "api_key": api_key,
    "action_check": `${trans_type}_history`

}, trans_type)



  React.useEffect(()=>{
    if (myData.data){
      setData(myData.data)
    }
  },[myData, trans_type])

console.log(trans_id)

  React.useEffect(()=>{
    if(trans_type === 'wallet'){
      const row = data.find((item:any)=> item.wallet_id === trans_id)
      setRow(row)
    }else if(trans_type === 'recharge'){
      const row = data.find((item:any)=> item.rec_id === trans_id)
      setRow(row)
    }else{
      const row = data.find((item:any)=> item.bonus_id === trans_id)
      setRow(row)
    }
    
  },[trans_id])

  console.log(row)


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
            <div className='flex items-center justify-center relative flex-col gap-6'>
                        <button className="absolute right-[-16px] top-[-16px] cursor-pointer bg-Black font-extrabold" onClick={onClose}>
                            <img src="/images/png/close.png" alt="" width='30px' />
                        </button>

                    <h3 className='font-[700] font-int text-[16px] text-center mt-4'>Preview for {trans_type.toUpperCase()} Trans Number {row?.wallet_id || row?.rec_id || row?.bonus_id}</h3>

                    {
                      trans_type === 'recharge'?
                      <div className='space-y-3 w-full text-[#1E0029] font-int text-[16px]'>
                      <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Username</p>
                            <p className='grid-col '>{row?.username || row?.rec_id || row?.bonus_id}</p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Website</p>
                            <p className=' '>{row?.website}</p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Beneficiary</p>
                            <p className='grid-col '></p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Amount</p>
                            <p className='grid-col '>{row?.amount}</p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Date Created</p>
                            <p className='grid-col '>{row?.date_added}</p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Remarks</p>
                            <p className='grid-col '>{row?.true_response}</p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Process</p>
                            <p className='grid-col '></p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>TxGateway</p>
                            <p className='grid-col '></p>
                        </div>
                        <div className='grid grid-cols-2 border-b py-1'>
                            <p className='font-[500]'>Transaction type</p>
                            <p className='grid-col '>{row?.service_name}</p>
                        </div>
                    </div>

                    :

                    <div className='space-y-3 w-full text-[#1E0029] font-int text-[16px]'>
                    <div className='grid grid-cols-2 border-b py-1'>
                          <p className='font-[500]'>Process</p>
                          <p className='grid-col '>{row?.process}</p>
                      </div>

                      <div className='grid grid-cols-2 border-b py-1'>
                          <p className='font-[500]'>Amount</p>
                          <p className='grid-col '>{row?.amount}</p>
                      </div>
                      <div className='grid grid-cols-2 border-b py-1'>
                          <p className='font-[500]'>Date Created</p>
                          <p className='grid-col '>{row?.date}</p>
                      </div>

                      <div className='grid grid-cols-2 border-b py-1'>
                          <p className='font-[500]'>Purpose</p>
                          <p className='grid-col '>{row?.purpose}</p>
                      </div>
                  </div>
                    }

                    <div className='w-full space-x-4 flex'>
                        <button className='bg-[#28C0F1] text-white w-[112px] h-[40px] flex justify-center items-center rounded-lg'>Requery</button>
                        <button className='border border-[#28C0F1] text-[#22347F] w-[112px] h-[40px] flex justify-center items-center rounded-lg'>Close</button>
                    </div>
                 

              </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransactionModal