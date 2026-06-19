import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import structures from "../data";

const leftSidebar = [structures[4], structures[5]];
const rightSidebar = [structures[6], structures[3]]; 
const lukoil = structures[1];
const gazprom = structures[0];

function SidebarCard({ item, align }: { item: typeof structures[0]; align: 'left' | 'right' }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <Box sx={{ order: { xs: 1, md: align === 'right' ? 2 : 1 } }}>
        <Box
          component="img"
          src={item.img}
          alt={item.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ order: { xs: 2, md: align === 'right' ? 1 : 2 } }}>
        <Box component="h3" sx={{ textAlign: align === 'left' ? 'right' : 'left' }}>
          {item.title}
        </Box>
        <Box component="p">{item.description[0]}</Box>
        <Box
          component="button"
          sx={{
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            marginTop: '10px',
            marginLeft: align === 'left' ? 'auto' : 0,
            marginRight: align === 'right' ? 'auto' : 0,
            display: 'block',
          }}
        >
          Подробнее
        </Box>
      </Box>
    </Box>
  );
}

function Content() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '20% 1fr 20%' },
          gap: '20px',
          width: '90%',
          margin: '20px auto',
        }}
      >
        <Box
          sx={{
            padding: '10px',
            borderRight: { md: '2px solid black' },
          }}
        >
          {leftSidebar.map((item) => (
            <SidebarCard key={item.title} item={item} align="left" />
          ))}
        </Box>

        <Box>
          <Box sx={{ border: '1px solid #aaa', padding: '15px', marginBottom: '20px' }}>
            <Box component="h2" sx={{ textAlign: 'center', marginBottom: '10px' }}>
              {lukoil.title}
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <Box component="p">{lukoil.description[0]}</Box>
              <Box
                component="img"
                src={lukoil.img}
                alt={lukoil.title}
                sx={{ width: '100%', maxWidth: 320, margin: 'auto', display: 'block', borderRadius: '8px' }}
              />
              <Box>
                <Box component="p">{lukoil.description[1]}</Box>
                <Box
                  component="button"
                  sx={{
                    backgroundColor: '#008CBA',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    marginTop: '10px',
                  }}
                >
                  Подробнее
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ border: '1px solid #aaa', padding: '15px', marginBottom: '20px' }}>
            <Box component="h2" sx={{ marginBottom: '10px' }}>
              {gazprom.title}
            </Box>
            <Box component="p">{gazprom.description[0]}</Box>
            <Box component="p">{gazprom.description[1]}</Box>
            <Box
              component="button"
              sx={{
                backgroundColor: '#008CBA',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                marginTop: '10px',
                marginLeft: 'auto',
                display: 'block',
              }}
            >
              Подробнее
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            padding: '10px',
            borderLeft: { md: '2px solid black' },
          }}
        >
          {rightSidebar.map((item) => (
            <SidebarCard key={item.title} item={item} align="right" />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Content;