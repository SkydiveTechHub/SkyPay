import React, {useEffect, useState} from 'react';
import { DataGrid, GridColDef, GridCellParams, GridEventListener } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TransactionModal from '../shared/modals/transViewModal';




interface User {
  ProviderResponse: string
  amount:string
  api_id:string
  date:string
  date_added:string
  pay_status:string
  phone:string
  rec_id:number
  wallet_id:number
  bonus_id:number
  responseCode:string
  service_name:string
  service_part:string
  source:string
  process:string
  status:string
  token:string
  true_response:string
  upload_id:number
  username:string
  username_part:string
  vendor_id:number
  website:string
  website_part:string
}

const defaultColumns :GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    maxWidth: 100,
    headerClassName: 'header',
    headerName: 'ID',
    renderCell: ({ row }) => (
      <Typography>{`${row.rec_id | row.wallet_id | row.bonus_id}`}</Typography>
    )
  },
    {
    flex: 0.1,
    minWidth: 150,
    field: 'date',
    headerClassName: 'header',
    headerName: 'Date',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.date_added?.split(' ')[0] || row.date?.split(' ')[0] }`}</Typography>
    )
  },
    {
    flex: 0.1,
    minWidth: 150,
    field: 'amount',
    headerClassName: 'header',
    headerName: 'Amount',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {/* <Button color='success' sx={{ fontSize: 10, px: 0 }}>
          
        </Button> */}
        {`₦${row.amount || 0}`}
      </Typography>
    )
  },
  // {
  //   flex: 0.05,
  //   field: 'status',
  //   minWidth: 50,
  //   headerName: '',
  //   renderCell: ({ row }) => {
  //     const { status } = row
  //     const [cur_status, setStatus] = useState<string>('success')
  //     const [icon, setIcon] = useState<string>('')
  //     useEffect(() => {
  //       if (status === 'Done') {
  //         setStatus('success')
  //         setIcon('circle-check-filled')
  //       } else if (status === 'Failed') {
  //         setStatus('error')
  //         setIcon('playstation-x')
  //       } else if (status === 'Pending') {
  //         setStatus('warning')
  //         setIcon('loader-3')
  //       } else {
  //         setStatus('info')
  //       }
  //     }, [status])

  //     return (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         {/* {renderClient(row)} */}
  //         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //           <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 400, fontSize: 12 }}>
  //             <IconButton size='small'  sx={{ fontSize: 10, py: 1, color:{cur_status}}}>
  //               <Icon icon={`tabler:${icon}`} />
  //             </IconButton>
  //           </Typography>
  //         </Box>
  //       </Box>
  //     )
  //   }
  // },
  // {
  //   flex: 0.25,
  //   field: 'username',
  //   minWidth: 130,
  //   headerName: 'Username',
  //   renderCell: ({ row }) => {
  //     const { username, source, status, date_added } = row
  //     // const [v_status, setStatus] = useState('success')
  //     // useEffect(() => {
  //     //   if (status === 'Done') {
  //     //     setStatus('success')
  //     //   } else if (status === 'Failed') {
  //     //     setStatus('error')
  //     //   } else if (status === 'Pending') {
  //     //     setStatus('warning')
  //     //   } else {
  //     //     setStatus('info')
  //     //   }
  //     // }, [v_status])

  //     return (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         {/* {renderClient(row)} */}
  //         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //           <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
  //             {username}{' '}
  //           </Typography>
  //         </Box>
  //       </Box>
  //     )
  //   }
  // },

  {
    flex: 0.1,
    minWidth: 150,
    field: 'message',
    headerClassName: 'header',
    headerName: 'Movement',
    renderCell: ({ row }) => {
      let shortenedString = ''
      if (row.true_response === null) {
        shortenedString = ''
      } else {
        // shortenedString = shortenString(row.true_response, 50)
      }
      return (
        <>
          <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{shortenedString}</Typography>
        </>
      )
    }
  },


  {
    flex: 0.1,
    minWidth: 150,
    field: 'process',
    headerName: 'Transaction Type',
    headerClassName: 'header',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.source || row.process}`}</Typography>
    )
  },




  // {
  //   flex: 0.15,
  //   minWidth: 140,
  //   field: 'date',
  //   headerName: 'Date',
  //   renderCell: ({ row }) => (
  //     <Typography sx={{ color: 'text.secondary' }}>
  //       {row.date_added.split(' ')[0]} <br /> {row.date_added.split(' ')[1]}
  //     </Typography>
  //   )
  // }

  // {
  //   flex: 0.1,
  //   minWidth: 100,
  //   field: 'balance',
  //   headerName: 'Balance',
  //   renderCell: ({ row }) => {
  //     return row.balance !== 0 ? (
  //       <Typography sx={{ color: 'text.secondary' }}>{row.balance}</Typography>
  //     ) : (
  //       <CustomChip rounded size='small' skin='light' color='success' label='Paid' />
  //     )
  //   }
  // }
]
interface dataProp{
  data:any;
  type:string
}

const MyDataGrid = ({data, type}:dataProp) => {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open1, setOpen1] =useState<boolean>(false)
  const [rowID, setRowID] =useState<number>(0)

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen1 = (id:number) => {
    setRowID(id)
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

const [paginationModel, setPaginationModel] = React.useState({
  pageSize: 25,
  page: 0,
});

const columns:GridColDef[]  = [
  ...defaultColumns,
  {
    flex: 0.1,
    minWidth: 50,
    sortable: false,
    headerClassName: 'header',
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }:any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
            boxShadow:'0,0,0,0'
          },
        }}
      >
          <MenuItem sx={{boxShadow:"0"}} onClick={handleClose}>
            Hello
          </MenuItem>
      </Menu>

        {/* <Tooltip title='Delete Invoice'>
          <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => dispatch(deleteInvoice(row.id))}>
            <Icon icon='tabler:trash' />
          </IconButton>
        </Tooltip> */}
        {/* <Tooltip title='View'> */}
          
          {/* <RechargeDialog id={row.rec_id} db_name={`${user_type.user_type}_${user_type.trans_type}_DB`} /> */}
        {/* </Tooltip> */}

        {/* <OptionsMenu
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
          options={[
            {
              text: 'Reprocess Order',
              // icon: <Icon icon='mdi:reload'  />
            },
            {
              text: 'Admin Reprocess Pending',
              href: `/transaction/preview/${row.rec_id}`,
              // icon: <Icon icon='tabler:edit' fontSize={20} />
            },
            {
              text: 'Admin Reprocess Callbacks',
              // icon: <Icon icon='mdi:reload' fontSize={20} />
            },
            {
              text: 'Complete Transaction',
              // icon: <Icon icon='openmoji:mark' fontSize={20} />
            },
            {
              text: 'Resolve Failed Transaction',
              // icon: <Icon icon='bx:transfer-alt' fontSize={20} />
            },
            {
              text: 'Reprocess with Backup API',
              // icon: <Icon icon='tabler:copy' fontSize={20} />
            }
          ]}
        /> */}
      </Box>
    )
  }
]

const handleEvent: GridEventListener<'rowClick'> = (
  params, // GridRowParams
  event, // MuiEvent<React.MouseEvent<HTMLElement>>
  details, // GridCallbackDetails
) => {
  handleOpen1(params.row.rec_id || params.row.wallet_id || params.row.bonus_id)
  
};


const rows: User[] = data;

  return (

            <Box
                    sx={{
                      width: '100%',
                      '& .header': {
                        backgroundColor: '#28C0F11A',
                        color: "#28C0F1",
                        fontSize: '16px',
                        fontFamily: 'Inter',
                        fontWeight:'700'
                      },
                    }}
            >
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={row => row.rec_id || row.wallet_id || row.bonus_id}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                
                // pageSize={5}
                // rowsPerPageOptions={[5, 10, 20]}
                // checkboxSelection
                // onSelectionModelChange={(selection:any) => {
                //   // Handle selection changes if needed
                //   console.log(selection);
                // }}
                onRowClick={handleEvent}
                // onCellClick={(params: GridCellParams<User>) => {
                // // Open the row menu on cell click
                // console.log(params);
                // }}
            />

              <TransactionModal trans_id={rowID} trans_type={type} open={open1} onClose={handleClose1}/>
            </Box>



            


  );
};

export default MyDataGrid;
