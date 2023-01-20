import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { UIContext } from '../../context/ui/UIContext';

const menuitems :string[] = ['Inbox','Starred','Send Email','Draft'];

export const Sidebar = () => {

  const { sideMenuOpen, closeSideMenu } = useContext( UIContext);

  return (
    <Drawer
      anchor='left'
      open={ sideMenuOpen }
      onClose={ closeSideMenu }
    >
      <Box sx={{ width:250}}>
        <Box sx={{padding: '5px 10px'}}>
          <Typography variant='h4'>
            Menú
          </Typography>
        </Box>
        <List>
          {
            menuitems.map((menuText,index) => (
              <ListItem key={menuText} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={menuText} />
                </ListItemButton>
              </ListItem>
            )) 
          }
        </List>
        <Divider />
        <List>
          {
            menuitems.map((menuText,index) => (
              <ListItem key={menuText} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={menuText} />
                </ListItemButton>
              </ListItem>
            )) 
          }
        </List>
      </Box>
      
      
    </Drawer>
  )
}
