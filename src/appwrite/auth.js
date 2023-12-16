import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject([conf.appwriteProjectId]);

    this.account = new Account(this.client);
  }

  //signup for appwrite
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      //login as soon as account gets created
      if (userAccount) {
        //call login fun
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //sign in for app write
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Login Error: ", error);
    }
  }

  //current user info
  async getUserInfo() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("GetUserInfo Error: ", error);
    }
    return null;
  }

  //logout fun for appwrite
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite error :: logout :", error);
    }
  }
}

const authService = new AuthService();

export default authService;
