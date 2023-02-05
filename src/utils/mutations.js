import { addDoc, updateDoc, deleteDoc, collection, doc } from "firebase/firestore";
import { db } from './firebase';

// Functions for database mutations

export const emptyEntry = {
   name: "",
   link: "",
   description: "",
   user: "",
   category: 0,
}

export async function addEntry(entry) {
   let newEntry = {
      name: entry.name,
      link: entry.link,
      description: entry.description,
      user: entry.user,
      category: entry.category,
      // The ID of the current user is logged with the new entry for database user-access functionality.
      // You should not remove this userid property, otherwise your logged entries will not display.
      userid: entry.userid,
   };
   await addDoc(collection(db, "entries"), newEntry);
}

export async function updateEntry(entry) {
   await updateDoc(doc(db, "entries", entry.id), entry);
}

export async function deleteEntry(entry) {
   await deleteDoc(doc(db, "entries", entry.id))
}