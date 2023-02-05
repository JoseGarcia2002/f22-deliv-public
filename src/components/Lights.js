import Fab from '@mui/material/Fab';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Floating button to change dark/light theme preferences
//  Takes as arguments the state and setter for this component from the 
//  parent component
export default function Lights({darkMode, setDark}) {
    return (
        <Fab sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(5)
        }}
        onClick={() => setDark(!darkMode)}
        >
            {darkMode ? <Brightness4Icon/> : <Brightness7Icon/>}
        </Fab>
    )
}