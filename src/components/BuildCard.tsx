import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ComponentProps {
    building: {
        img: string, 
        title: string, 
        description: string[],
    };
    cardIndex: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: theme.spacing(1),
}));

function BuildCard({ building, cardIndex} : ComponentProps) {
    const isEven = cardIndex % 2 === 0;
    
    return (
      <Card sx={{  display: 'flex', flexDirection: { xs: 'column', md: isEven ? 'row-reverse' : 'row' } }}>
        <CardMedia
            component="img"
            alt={ building.title }
            image={ building.img }
            sx={{ 
                    width: { xs: '100%', md: 160 }, 
                    height: { xs: 200, md: 'auto' },
                    flexShrink: 0,
                    objectFit: 'contain'
            }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" >
              { building.title }
            </Typography>
            { building.description.map((item, ind) => (
              <Typography key={ind} variant="body2">    
                { item }
              </Typography>
            ))}
          </CardContent>
          <CardActions sx={{ justifyContent: isEven ? 'start' : 'end', mt: 'auto' }} >
            <Button size="small">Подробнее</Button>
          </CardActions>
        </Box>
      </Card>
    )
}

export default BuildCard;