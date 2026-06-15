import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
 
function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 6,
                py: 3,
                borderTop: '1px solid',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                    }}
                >
                    <Typography variant="body1">
                        Самохин Данил
                    </Typography>
                    <Typography variant="body1">
                        Б9123-09.03.04(2)
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
 
export default Footer;
 