import { Alert } from "react-native";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfing = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.example.koli",
  projectId: "674e98d40013d2cca5bf",
  databaseId: "674e9a9b002b363e8edf",
  userCollectionId: "674e9cf1001eb922ed9f",
  videoCollectionId: "674e9d1c00168aa5e887",
  storageId: "674e9f8e002abbc4c66a",
};

type userinfo = {
  email: string;
  password: string;
  username: string;
};

const client = new Client()
  .setEndpoint(appwriteConfing.endpoint)
  .setProject(appwriteConfing.projectId)
  .setPlatform(appwriteConfing.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const createuser = async ({
  email,
  password,
  username,
}: userinfo): Promise<any> => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error("User not created");

    const avatarurl = avatars.getInitials(username);
    await signin(email, password);

    const newUser = await database.createDocument(
      appwriteConfing.databaseId,
      appwriteConfing.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarurl,
      }
    );
    return newUser;
  } catch (e: any) {
    throw new Error(e);
  }
};

const deleteSession = async () => {
  try {
    const activeSessions = await account.listSessions();
    if (activeSessions.total > 0) {
      await account.deleteSession("current");
    }
  } catch (error) {
    console.log("No session available.");
  }
};

//sign in
export async function signin(email: string, password: string): Promise<any> {
  try {
    await deleteSession();
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    Alert.alert("error while signing in");
  }
}

export async function GetCurrentUser(): Promise<any> {
  try {
    const curerntAccount = await account.get();
    if (!curerntAccount) throw Error("Account not found");

    const currentUser = await database.listDocuments(
      appwriteConfing.databaseId,
      appwriteConfing.userCollectionId,
      [Query.equal("accountId", curerntAccount.$id)]
    );
    if (!currentUser) throw Error("User not found");
    return currentUser.documents[0];
  } catch (e: any) {
    //throw new Error(e);
  }
}

export const getVideos = async () => {
  try {
    const videos = await database.listDocuments(
      appwriteConfing.databaseId,
      appwriteConfing.videoCollectionId
    );
    return videos.documents;
  } catch (error) {
    Alert.alert("Error fetching videos");
  }
};

export const getLatestPost = async () => {
  try {
    const posts = await database.listDocuments(
      appwriteConfing.databaseId,
      appwriteConfing.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (e) {
    Alert.alert("Error while Latest Post");
  }
};

export const searchVideos = async (query: string) => {
  try {
    const posts = await database.listDocuments(
      appwriteConfing.databaseId,
      appwriteConfing.videoCollectionId,
      //TODO Implement more search freedom..Right now it only searches for partial text based search
      [Query.search("tittle", query)]
    );
    return posts.documents;
  } catch (e) {
    Alert.alert("Error while Latest Post");
    console.log(e);
  }
};

export const getUserPost = async (userId: string) => {
  try {
    const posts = await database.listDocuments(
      appwriteConfing.databaseId,
      appwriteConfing.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (e) {
    Alert.alert("Error while Latest Post");
    console.log(e);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    Alert.alert("Error while signing out");
  }
};
