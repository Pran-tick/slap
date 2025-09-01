import { StreamChat } from 'stream-chat';
import { ENV } from '../config/env.js';

//creating an instance for stream chat and for us to use stream chat api.
const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);

//functions to create a user in the stream database
export const upsertStreamUser = async (userData) => {
  const { id, name, image } = userData;
  // Check if the user already exists
  const existingUser = await streamClient.queryUsers({ id });
  try {
      await streamClient.upsertUser(userData);
      console.log('User upserted successfully: ', userData.name);
      return userData
  } catch (error) {
      console.error('Error upserting user: ', error);
  }
};


export const deleteStreamUser = async (userId) => {
  try {
      await streamClient.deleteUser(userId);
      console.log('User deleted successfully: ', userId);
      return userId;
  } catch (error) {
      console.error('Error deleting user: ', error);
  }
};

export const generateStreamToken = async (userId) => {
  try {
      const userIdString = userId.toString();
      return streamClient.createToken(userIdString);
  } catch (error) {
      console.log("Error generating stream token: ", error);
      return null;
  }
};


export const addUserToPublicChannels = async (newUserId) => {
  const publicChannels = await streamClient.queryChannels({ discoverable: true });

  for (const channel of publicChannels) {
    await channel.addMembers([newUserId]);
  }
};