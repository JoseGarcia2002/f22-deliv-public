import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from '@mui/material/InputBase';
import Paper from "@mui/material/Paper";
import SearchIcon from '@mui/icons-material/Search';

// Search bar component. Takes as input the current entries being displayed and 
// its setter
export default function Search({displayEntries, setDisplay}) {
    const [input, setInput] = useState("");

    // Search filter helper
    function filterHelper(entry) {
        return entry.name.includes(this) || entry.link.includes(this) || entry.user.includes(this);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setDisplay(displayEntries.filter(filterHelper, input));
        setInput("");
    }

    return (
        <Paper
            component="form"
            sx={{display: 'flex', pl: 2, width: '80%', flexShrink: 2}}
            onSubmit={handleSubmit}
        >
            <InputBase sx={{flexGrow: 2}} onChange={e => setInput(e.target.value)} value={input}/>
            <IconButton type="submit">
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}