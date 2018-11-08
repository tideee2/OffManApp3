export interface UserModel {
  userId: string;
  balance: number;
  email: string;
  token: string;
  name: string;
  transactions?: any;
  isLoging?: boolean;
}
