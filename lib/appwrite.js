import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.mhbagheri.aora',
  projectId: '662bd9ac00075815b6e5',
  databaseId: '662bdba900149900c4dd',
  userCollectionId: '662bdbd4001e1f643249',
  videoCollectionId: '662bdbf70019b710d3e2',
  storageId: '662bdd8e0001fa9301d8'
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
  
    if (!newAccount) throw Error

    const avatarUrl = avatar.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    await account.deleteSession('current');

    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) throw Error
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', user.$id)]
    );
    if (!currentUser) throw Error
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
    );
    if (!posts) throw Error
    return posts.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );
    if (!posts) throw Error
    return posts.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search('title', query)]
    );
    if (!posts) throw Error
    return posts.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal('creator', userId)]
    );
    if (!posts) throw Error
    return posts.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}