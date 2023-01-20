import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"

export const Navbar = () => {

  const { openSideMenu } = useContext( UIContext)

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          onClick={openSideMenu}
        >
          <MenuOutlined />
        </IconButton>
        <Typography>Open Jira</Typography>
      </Toolbar>
      
    </AppBar>
  )
}
