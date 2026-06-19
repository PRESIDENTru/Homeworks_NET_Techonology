import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer'; //
import React from 'react'; //
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList'; //
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Link} from 'react-router-dom';



const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '4px 8px',
}));

interface NavbarProps {
  activePage: string;
}

function Navbar({activePage = "1"}: NavbarProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    const getButtonVariant = (pageNumber: string) => {
        return activePage === pageNumber ? "contained" : "text";
    };

    const getMenuStyle = (pageNumber: string) => {
      if (pageNumber === activePage) {
        return {
          backgroundColor: 'blue'
        }
      };
      return {
        ":hover": {
            backgroundColor: "gray"
          }
      }
    }
     
    return (
        <AppBar      
          position="static"
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            mt: '10px',
          }}
        >
          <Container maxWidth="xl">
            <StyledToolbar>
               <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button component={Link} to="/" variant={activePage === '1' ? 'contained' : 'text'} color="info" size="medium">
              Главная
            </Button>
            <Button component={Link} to="/list" variant={activePage === '2' ? 'contained' : 'text'} color="info" size="medium">
              Список компаний
            </Button>
            <Button component={Link} to="/charts" variant={activePage === '3' ? 'contained' : 'text'} color="info" size="medium">
              Диаграммы
            </Button>
          </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' }}}>    
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="top"
                  open={ open }
                  onClose={toggleDrawer(false)}
                >
                  <MenuList>
                  <MenuItem component={Link} to="/" selected={activePage === '1'} onClick={toggleDrawer(false)} sx={{ '&:hover': { color: '#5d8aa8' } }}>Главная</MenuItem>
                  <MenuItem component={Link} to="/list" selected={activePage === '2'} onClick={toggleDrawer(false)} sx={{ '&:hover': { color: '#5d8aa8' } }}>Список зданий</MenuItem>
                  <MenuItem component={Link} to="/charts" selected={activePage === '3'} onClick={toggleDrawer(false)} sx={{ '&:hover': { color: '#5d8aa8' } }}>Диаграммы</MenuItem>
                </MenuList>
                </Drawer>    
             </Box>
            </StyledToolbar>
          </Container>
        </AppBar>
    );
}
export default Navbar;