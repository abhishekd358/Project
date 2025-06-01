import express from 'express';
import { UserAuth } from '../Auth/user.auth.js';
import { addContact, delContact, getAllContact, updateContact } from '../Controllers/contact.controller.js';



const router = express.Router()

// ----------------------------------------User routes
// route desc: get all contacts
// method: post
// endpoint: /api/user/contact
router.get("/", UserAuth,getAllContact)

// route desc: create new contact
// method: post
// endpoint: /api/user/contact/add
router.post("/add",UserAuth, addContact)

// route desc: delete contact by id
// method: post
// endpoint: /api/user/contact/:id
router.delete("/:id",UserAuth, delContact)

// route desc: update existing contact by id
// method: post
// endpoint: /api/user/contact/:id
router.put("/:id",UserAuth, updateContact)



export default router;