import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { categories } from '../utils/categories';
import Grid from '@mui/material/Grid';


// A component for the filter menu
//  Takes as arguments the current entries (all of them) and setter for the 
//  display entries (to control what is show)
export default function FilterMenu({displayEntries, setDisplay}) {
    // Code to set up the popper
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const id = open ? 'filter-menu' : undefined;

    // Setting up our filter menu options
    const checkedStates = () => {
        let obj = {};
        categories.forEach(({id, name}) => {
            obj[id] = false;
        })
        return obj;
    }

    // Filter menu states
    const [state, setState] = useState(checkedStates());
    const [sortStates, setSort] = useState({ascending: false, descending: false})

    const handleClick = (e) => {
        setAnchor(e.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null);
    }

    // Some helper functions to handle sorting and filtering
    function sortHelper(entry1, entry2) {
        let cat1 = entry1.name;
        let cat2 = entry2.name;

        if (cat1 < cat2) {
            return -1;
        }
        else if (cat1 > cat2) {
            return 1;
        }
        return 0;
    }

    function filterHelper(entry) {
        // The use of 'this' means this function cannot be an 
        // arrow function
        if (this.length === 0)
            return true;
        for (let filter of this) {
            if (entry.category === filter) {
                return true;
            }
        }
        return false;
    }
    // Do the filtering 
    const handleSubmit = () => {
        let filters = [];
        for (let {id, name} of categories) {
            if (state[id]) {
                filters.push(id);
            }
        }
        let filtered = displayEntries.filter(filterHelper, filters);
        if (sortStates.ascending || sortStates.descending) {
            filtered.sort(sortHelper);
            if (sortStates.descending) {
                filtered.reverse();
            }
        }
        setDisplay(filtered);
    }
    
    return (
        <div>
            <Button sx={{height: '100%'}} startIcon={<FilterListIcon/>} variant="contained" onClick={handleClick}>Filter</Button>
            <Popover
                id = {id}
                open = {open}
                anchorEl = {anchor}
                onClose = {handleClose}
                anchorOrigin = {{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Paper sx={{p: 5}}>
                    <Typography variant="h6"> Filter </Typography>
                    <FormControl component="fieldset">
                        <Grid container columnSpacing={{md: 10}}>
                            <Grid item xs={6}>
                            <FormLabel component="legend">Filter by category</FormLabel>
                            <FormGroup>
                            {categories.map(({id, name}) => (
                                <FormControlLabel control={
                                    <Checkbox checked={state[id]} 
                                        onChange={()=>{
                                            let updatedVal = {};
                                            updatedVal[id] = !state[id];
                                            setState({...state, ...updatedVal});
                                        }} 
                                        name={name.replace(" ", "_")} />}
                                label={name} key={id}/>
                            ))}
                            </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                                <FormLabel component="legend">Sort</FormLabel>
                                <FormGroup>
                                    <FormControlLabel control={
                                        <Checkbox checked={sortStates.ascending} 
                                            onChange={() => {
                                                // Handle the two cases: 1) first time a button is clicked 2) a sort has already been set
                                                if (sortStates.descending) {
                                                    setSort({descending: !sortStates.descending, ascending: !sortStates.ascending});
                                                }
                                                else {
                                                    setSort({...sortStates, ascending: !sortStates.ascending})};
                                                }
                                            } 
                                            name="ascending"/>
                                    } label="ascending"/>
                                    <FormControlLabel control={
                                        <Checkbox checked={sortStates.descending} 
                                            onChange={() => {
                                                if (sortStates.ascending) {
                                                    setSort({descending: !sortStates.descending, ascending: !sortStates.ascending});
                                                }
                                                else {
                                                    setSort({...sortStates, descending: !sortStates.descending})};
                                                }
                                            } 
                                            name="descending"/>
                                    } label="descending"/>
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Button variant={"outlined"} onClick={handleSubmit}>Apply</Button>
                    </FormControl>
                </Paper>
            </Popover>
        </div>
    )
}