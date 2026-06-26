import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, Link } from 'react-router-dom';
import structures from "../data";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Company() {
  const { id } = useParams();
  const index = id !== undefined ? parseInt(id, 10) : 0;
  const safeIndex =
  Number.isFinite(index) && index >= 0 && index < structures.length ? index : 0;
  const company = structures[safeIndex];

  return (
    <div>
      <Navbar activePage="1" />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link to="/" style={{ color: '#5d8aa8', textDecoration: 'none' }}>
            Главная
          </Link>
          <Typography color="text.primary">{company.title}</Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {company.title}
        </Typography>

        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <img
                src={company.img}
                alt={company.title}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {company.description.map((paragraph, i) => (
              <Typography key={i} variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                {paragraph}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Company;