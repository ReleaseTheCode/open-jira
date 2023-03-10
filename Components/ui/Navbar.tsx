import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import NextLink from 'next/link';

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
        <NextLink href='/' passHref legacyBehavior>
          <Link underline='none' color={'white'}>
            <Typography>Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
      
    </AppBar>
  )
}
