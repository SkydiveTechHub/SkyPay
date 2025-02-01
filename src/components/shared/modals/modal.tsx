import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';

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
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

const logo_list = [
  {'mtn': '/images/png/mtn.png'},
  {'airtel': '/images/png/airtel.png'},
  {'glo': '/images/png/glo.png'},
  {'9mobile': '/images/png/9mobile.png'},
  {'dstv': '/images/svgs/DSTV.svg'},
  {'gotv': '/images/svgs/GOTV.svg'},
  {'startimes': '/images/svgs/StarTimes.svg'},
  {'spectranet': '/images/png/spectranet.png'},
  {'smile': '/images/png/smile.png'},
  {'waec': '/images/png/waec.png'},
  {'neco': '/images/png/neco.png'},
  {'nabteb': '/images/png/nabteb.png'},
]

 const TopModal:React.FC<ModalProps> = ({children, open, onClose}) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

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
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TopModal