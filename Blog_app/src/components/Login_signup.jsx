import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Login_signup = () => {
  return (
    <div>
        <Box sx={{ flexGrow: 0.125, display: { xs: 'none', md: 'flex', justifyContent: 'right' } }}>
    <Link color='inherit' to='/login'>
        <Button
          
          sx={{ my: 2, color: '#2c2c34' ,bgcolor:'#bc8fcf' }}
        >
         Login/signup 
        </Button>
        </Link>
    </Box></div>
  )
}

export default Login_signup