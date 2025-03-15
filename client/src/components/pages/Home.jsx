import React from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Container, 
  IconButton, 
  InputAdornment, 
  Menu, 
  MenuItem, 
  Paper, 
  TextField, 
  Toolbar, 
  Typography, 
  useMediaQuery 
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
// Create a custom theme with the blue color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0040ff',
    },
    background: {
      default: '#e6efff',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          textTransform: 'none',
          padding: '8px 24px',
          fontWeight: 500,
        },
        containedPrimary: {
          color: 'white',
        },
        outlinedPrimary: {
          borderColor: '#0040ff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
  },
});

// Styled components
const RoundedButton = styled(Button)(({ theme }) => ({
  borderRadius: 28,
  padding: '10px 24px',
  fontWeight: 500,
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  border: '1px solid #e0e0e0',
  padding: 12,
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const SearchCard = styled(Paper)(({ theme }) => ({
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 50,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  marginBottom: 16,
}));

const AppointmentCard = styled(Paper)(({ theme }) => ({
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 24,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
}));

const PillDecoration = styled('div')(({ theme, position, color }) => ({
  position: 'absolute',
  width: position === 'top' ? 120 : 150,
  height: position === 'top' ? 60 : 75,
  borderRadius: 50,
  backgroundColor: color === 'blue' ? theme.palette.primary.main : 'white',
  border: '1px solid #e0e0e0',
  zIndex: 0,
  ...(position === 'top' && {
    top: -30,
    left: -60,
    transform: 'rotate(-30deg)',
  }),
  ...(position === 'bottom' && {
    bottom: -40,
    right: -60,
    transform: 'rotate(30deg)',
  }),
}));

export default function Home() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const navigate = useNavigate();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        width:'100vw',
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Pill decorations */}
        <PillDecoration position="top" color="blue" />
        <PillDecoration position="bottom" color="white" />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Navigation */}
          <AppBar position="static" elevation={0} color="transparent">
            <Toolbar sx={{ py: 2 }}>
              <Typography variant="h2" component="div" sx={{ flexGrow: 0, mr: 4 }}>
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Claim</Box>
                <Box component="span" sx={{ color: 'text.primary' }}>Sync</Box>
              </Typography>
              
             
              
              <Box sx={{ ml: 'auto' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mr: 2 }}
                  onClick={()=>{
                    navigate('/login')
                  }}
                >
                  Sign in
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={()=>{
                    navigate('/register')
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          
          {/* Hero Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center', 
            py: 8,
            mt: 4
          }}>
            {/* Left Content */}
            <Box sx={{ flex: 1, pr: isMobile ? 0 : 4, mb: isMobile ? 4 : 0 }}>
              <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                <Box component="span" sx={{ color: 'primary.main' }}>We care</Box>
                <br />
                <Box component="span" sx={{ color: 'text.primary' }}>about your health</Box>
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                Good health is the state of mental, physical and social well being and it does not just mean absence of diseases.
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <RoundedButton 
                  variant="contained" 
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mr: 3 }}
                  onClick={()=>{
                    navigate('./login')
                  }}
                >
                  Get Started
                </RoundedButton>
                
               
              </Box>
              
            
            </Box>
            
            {/* Right Content */}
            <Box sx={{ 
              flex: 1, 
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}>
              {/* Search and Appointment Cards */}
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0,
                zIndex: 2,
                width: '100%',
                maxWidth: 400,
              }}>
                <SearchCard>
                  <SearchIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="body1" fontWeight={500}>
                      Well Qualified doctors
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Treat with care
                    </Typography>
                  </Box>
                </SearchCard>
                
                <AppointmentCard>
                  <Box sx={{ 
                    backgroundColor: 'primary.main', 
                    borderRadius: '50%',
                    p: 1,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CalendarTodayIcon sx={{ color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>
                      Get Started
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Online Tracker
                    </Typography>
                  </Box>
                </AppointmentCard>
              </Box>
              
              {/* Doctors Image */}
              <Box 
                component="img"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%204017%202-dvjzf80XFUkSByKq27gS9I9KMUKRGq.png"
                alt="Doctors"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 24,
                  mt: isMobile ? 10 : 0,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}