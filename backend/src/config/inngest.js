//this file is for inngest functionality which handles events from Clerk and syncs them with our database

import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });

//syncing user from clerk to our database. This is the function which is responsible to create the user in our database
const syncUser = inngest.createFunction(
    { id: 'sync-user' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        // Handle the event and sync the user to the database
        await connectDB();
        //this is all the params we can get from clerk when a user is created
        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        //this follows the user.model.js whenever we create a new user
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ''} ${last_name || ''}`,
            image: image_url || '',
        }
        //the below function creates a new user in our database
        await User.create(newUser);
        //the below function will create a user in the stream database as well. We are passing the user details to the function
        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.image
        })
        await addUserToPublicChannels(newUser.clerkId.toString());
    }
);

const deleteUserFromDB = inngest.createFunction(
    { id: 'delete-user' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        await connectDB();
        // Handle the event and delete the user from the database
        const { id } = event.data;
        //the below function deletes a user from our database
        await User.deleteOne({ clerkId: id });
        //do more things here
        await deleteStreamUser(id.toString());
    }
);  

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];