import structures from "../data";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const imgData = structures.slice(0, -1);

const spanSx: Record<number, object> = {
  0: { gridRow: { xs: 'auto', sm: 'span 3' }, gridColumn: { xs: 'auto', sm: 1 } },
  1: { gridColumn: { xs: 'auto', sm: '2 / span 2' } },
};

function Gallery() {
  const navigate = useNavigate();

  const handleImageClick = (index: number) => {
    navigate(`/companies/${index}`);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr' },
          gridTemplateRows: { xs: 'auto', sm: 'repeat(3, 90px)' },
          gap: '5px',
          width: '90%',
          margin: '20px auto',
        }}
      >
        {imgData.map((item, index) => (
          <Box
            key={item.img}
            component="img"
            src={item.img}
            alt={item.title}
            onClick={() => handleImageClick(index)}
            sx={{
              width: '100%',
              height: { xs: 150, sm: '100%' },
              borderRadius: '4px',
              objectFit: 'cover',
              ...(spanSx[index] || {}),
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          />
        ))}
      </Box>
    </Container>
  );
}

export default Gallery;