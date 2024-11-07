import Config from "../Config/Config.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";
import authService from "./auth.js";
import { useDispatch } from "react-redux";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(Config.appwriteURL);
    this.client.setProject(Config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPostRequest({ title, content, slug, featuredImage, userId }) {
    try {
      await this.databases.createDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error ", error);
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        Config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error ", error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(Config.appwriteBucketId, fileID);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ", error);
      return false;
    }
  }

  getFilePreview(fileID) {
    return this.storage.getFilePreview(Config.appwriteBucketId, fileID);
  }
}

const service = new Service();

export default service;
