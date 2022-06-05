import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
  SwipeableDrawer,
} from '@mui/material';
import React, { FC } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import classes from './HomePage.module.scss';
import DialogModal from '../../components/DialogModal/DialogModal';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const HomePage: FC<any> = function HomePage({ users }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: any) => {
    if (
      event
      && event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="Send message" onClick={handleClickOpen} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ForwardToInboxIcon />
            </ListItemIcon>
            <ListItemText primary="Send message" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <DialogModal users={users} isOpen={isOpen} close={handleClose} />
      <div>
        <React.Fragment key="left">
          <SwipeableDrawer
            anchor="left"
            open={state.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div>
            {renderMobileMenu}
            {renderMenu}
            <IconButton
              onClick={toggleDrawer('left', true)}
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Yauheni Melnik
            </Typography>
          </div>
          <div>
            <div>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomePage;
