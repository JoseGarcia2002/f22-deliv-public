import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

// A simple alert component
//  The arguments are the state and setters that will be used in the parent 
//  component to activate the alert message
export default function AlertMessage({alertOpen, setAlert, message, status}) {
    return (
        <Collapse in={alertOpen}>
            <Alert 
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setAlert(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                severity={status ? 'success' : 'error'} 
                open={true} >
                {message}
            </Alert>
        </Collapse>
    )
}