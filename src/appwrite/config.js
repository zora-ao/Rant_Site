import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.ENDPOINT).setProject(conf.PROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(conf.DATABASE_ID, conf.COLLECTION_ID, postId)
        } catch (error) {
            console.log("APPWRITE :: getPost() :: ", error);
            throw error
        }
    }

    async getPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.DATABASE_ID, conf.COLLECTION_ID, query);
        } catch (error) {
            console.log("APPWRITE :: getPosts() :: ", error);
            throw error
        }
    }

    async createPost({title, featured_img, user_id, status, content}) {
        try {
            return await this.databases.createDocument(conf.DATABASE_ID, conf.COLLECTION_ID, ID.unique(), {
                title,
                content,
                featured_img,
                status,
                user_id
            })
        } catch (error) {
            console.log("APPWRITE :: createPost() :: ", error);
            throw error 
        }
    }

    async updatePost(postId, {title, featured_img, status, content}) {
        try {
            return await this.databases.updateDocument(conf.DATABASE_ID, conf.COLLECTION_ID, postId, {
                title, featured_img, status, content
            })
        } catch (error) {
            console.error("APPWRITE :: updatePost() , ", error);
            throw error
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(conf.DATABASE_ID, conf.COLLECTION_ID, postId);
            return true
        } catch (error) {
            console.log("APPWRITE :: deletePost() ", error);
            return false
        }
    }

    // Storage

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.BUCKET_ID, ID.unique(), file)
        } catch (error) {
            console.error("APPWRITE :: uploadFile() ", error);
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.BUCKET_ID, fileId);
        } catch (error) {
            console.log("APPWRITE :: deleteFile() ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.BUCKET_ID, fileId).href;
    }
}

const service = new Service();
export default service