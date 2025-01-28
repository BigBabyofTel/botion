import { decodeAccessToken } from '@/utils/jwt';

export interface UserClass {
  username: string;
  email: string;
  isAuthenticated: boolean;
}

class UserService {
  //properties
  private username: string = '';
  private email: string = '';
  private isAuthenticated: boolean = false;
  private AccessToken: string = '';

  //getters
  public get getUsername(): string {
    return this.username;
  }

  public get getEmail(): string {
    return this.email;
  }

  public get getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public get getAccessToken(): string {
    return this.AccessToken;
  }

  //setters
  public set setUsername(username: string) {
    this.username = username;
  }

  public set setEmail(email: string) {
    this.email = email;
  }

  public setIsAuthenticated() {
    return !this.isAuthenticated;
  }

  //func to set to JSON then session storage
  public setToSessionStorage() {
    const user: UserClass = {
      username: this.username,
      email: this.email,
      isAuthenticated: this.isAuthenticated,
    };
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  //func to get from session storage
  public getFromSessionStorage() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData: UserClass = JSON.parse(user);
      this.username = userData.username;
      this.email = userData.email;
      this.isAuthenticated = userData.isAuthenticated;
    }
  }

  //func to remove from session storage
  public removeFromSessionStorage() {
    sessionStorage.removeItem('user');
  }

  //func to check if user is authenticated
  public checkIsAuthenticated() {
    this.getFromSessionStorage();
    return this.isAuthenticated;
  }

  //func to decrypt token
  public async decodeAccessToken(accessToken: string) {
    const decodedToken = await decodeAccessToken(accessToken);
    if (decodedToken) {
      this.username = decodedToken.payload.username as string;
      this.email = decodedToken.payload.email as string;
      this.isAuthenticated = true;
    } else {
      return `Failed to decode token`;
    }
  }
}

export const user = new UserService();