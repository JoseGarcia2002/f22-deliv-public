import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState, useContext } from 'react';
import { categories } from '../utils/categories';
import { addEntry, updateEntry, deleteEntry } from '../utils/mutations';
import { AlertContext } from '../App';

// Modal component for individual entries.

/* EntryModal parameters:
entry: Data about the entry in question
type: Type of entry modal being opened. 
   This can be "add" (for adding a new entry) or 
   "edit" (for opening or editing an existing entry from table).
user: User making query (The current logged in user). */

export default function EntryModal({ entry, type, user }) {

   // State variables for modal status

   // TODO: For editing, you may have to add and manage another state variable to check if the entry is being edited.

   const [open, setOpen] = useState(false);
   const [name, setName] = useState(entry.name);
   const [link, setLink] = useState(entry.link);
   const [description, setDescription] = useState(entry.description);
   const [category, setCategory] = useState(entry.category);

   // Input error states
   const [nameError, setNameError] = useState(false);
   const [linkError, setLinkError] = useState(false);
   const [descError, setDescError] = useState(false);

   // Consuming the context established in App
   const alert = useContext(AlertContext);

   // Modal visibility handlers

   const handleClickOpen = () => {
      setOpen(true);
      setName(entry.name);
      setLink(entry.link);
      setDescription(entry.description);
      setCategory(entry.category);
   };

   const handleClose = () => {
      setOpen(false);
   };

   // Mutation handlers
   // Helper function to generate the entry in the modal
   const fromEntry = () => {
      return {
         name: name,
         link: link,
         description: description,
         user: user?.displayName ? user?.displayName : "GenericUser",
         category: category,
         userid: user?.uid,
      };
   }

   // Ensure data is not empty or all whitespace
   //    return true is the all data is valid
   const validateData = () => {
      let counter = 0;
      if (!name.replaceAll(" ", "")) {
         setNameError(true);
         counter += 1;
      }
      else {
         setNameError(false);
      }
      if (!link.replaceAll(" ", "")) {
         setLinkError(true);
         counter += 1;
      }
      else {
         setLinkError(false);
      }
      if (!description.replaceAll(" ", "")) {
         setDescError(true);
         counter += 1;
      }
      else {
         setDescError(false);
      }
      return !counter;
   }

   const handleAdd = () => {
      if (validateData()) {
         const newEntry = fromEntry();
         // Added more error handling
         addEntry(newEntry)
            .then(() => {
               alert.setAlertMessage("Succesfully added your entry!");
               alert.setSuccess(true);
            })
            .catch(() => {
               alert.setAlertMessage("Couldn't add your entry!");
               alert.setSuccess(false);
            })
            .finally(() => {
               alert.setAlert(true);
               handleClose();
            })
      }
   };

   const handleEdit = () => {
      if (validateData()) {
         const input = fromEntry();
         const updatedEntry = {...input, id: entry.id};
         updateEntry(updatedEntry)
            .then(() => {
               alert.setAlertMessage("Succesfully edited your entry!");
               alert.setSuccess(true);
            })
            .catch(() => {
               alert.setAlertMessage("Couldn't edit your entry!");
               alert.setSuccess(false);
            })
            .finally(() => {
               alert.setAlert(true);
               handleClose();
            })
      }
   }

   const handleDelete = () => {
      deleteEntry(entry)
         .then(() => {
            alert.setAlertMessage("Succesfully deleted your entry!");
            alert.setSuccess(true);
         })
         .catch(() => {
            alert.setAlertMessage("Couldn't delete your entry!");
            alert.setSuccess(false);
         })
         .finally(() => {
            alert.setAlert(true);
            handleClose();
         })
   }

   // Button handlers for modal opening and inside-modal actions.
   // These buttons are displayed conditionally based on if adding or editing/opening.
   // TODO: You may have to edit these buttons to implement editing/deleting functionality.

   const openButton =
      type === "edit" ? <IconButton onClick={handleClickOpen}>
         <OpenInNewIcon />
      </IconButton>
         : type === "add" ? <Button sx={{height: '100%'}} variant="contained" onClick={handleClickOpen}>
            Add entry
         </Button>
            : null;

   const actionButtons =
      type === "edit" ?
         <DialogActions>
            <Box mr={'auto'}>
               <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
            </Box>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleEdit}>Edit Entry</Button>
         </DialogActions>
         : type === "add" ?
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button variant="contained" onClick={handleAdd}>Add Entry</Button>
            </DialogActions>
            : null;

   return (
      <div>
         {openButton}
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{type === "edit" ? name : "Add Entry"}</DialogTitle>
            <DialogContent>
               {/* TODO: Feel free to change the properties of these components to implement editing functionality. The InputProps props class for these MUI components allows you to change their traditional CSS properties. */}
               <TextField
                  margin="normal"
                  id="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  error={nameError}
                  helperText={nameError ? "required" : ""}
               />
               <TextField
                  margin="normal"
                  id="link"
                  label="Link"
                  placeholder="e.g. https://google.com"
                  fullWidth
                  variant="standard"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                  error={linkError}
                  helperText={linkError ? "required" : ""}
               />
               <TextField
                  margin="normal"
                  id="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                  multiline
                  maxRows={8}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  error={descError}
                  helperText={descError ? "required" : ""}
               />

               <FormControl fullWidth sx={{ "margin-top": 20 }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={(event) => setCategory(event.target.value)}
                  >
                     {categories.map((category) => (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>))}
                  </Select>
               </FormControl>
            </DialogContent>
            {actionButtons}
         </Dialog>
      </div>
   );
}