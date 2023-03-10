export type AuthContextType = {
    account : any;
    setAccount: (account: any) => void;
    token: string;
    setToken: (token: string) => void;
  }