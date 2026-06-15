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
               <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <Button variant={getButtonVariant("1")} color="info" size="medium">
                  Главная
                </Button>
                <Button variant={getButtonVariant("2")} color="info" size="medium">
                  Новости
                </Button>
                <Button variant={getButtonVariant("3")} color="info" size="medium">
                  Рейтинг
                </Button>
                <Button variant={getButtonVariant("4")} color="info" size="medium">
                  Фото
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
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <IconButton onClick={toggleDrawer(false)}>
                       <CloseRoundedIcon />
                      </IconButton>
                    </Box>
                    <MenuItem sx={getMenuStyle("1")}>Главная </MenuItem>
                    <MenuItem sx={getMenuStyle("2")}>Новости</MenuItem>
                    <MenuItem sx={getMenuStyle("3")}>Рейтинг</MenuItem> 
                    <MenuItem sx={getMenuStyle("4")}>Фото</MenuItem> 
                  </MenuList>
                </Drawer>    
             </Box>
            </StyledToolbar>
          </Container>
        </AppBar>
    );
}
export default Navbar;