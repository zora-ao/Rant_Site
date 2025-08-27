import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client = new Client().setEndpoint(conf.ENDPOINT).setProject(conf.PROJECT_ID);
        this.account = new Account(this.client);
    }

    async createUserAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount){
                return this.LoginAccount({email, password});
            } else {
                return userAccount
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    async loginAccount({email, password}){
        try {
            return this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getUserSession(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("APPWRITE :: getUserSession, ", error);
        }
    }

    async logoutAccount() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("APPWRITE :: logoutAccount , ", error);
        }
    }
}

const authService = new AuthService();
export default authService;