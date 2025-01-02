export interface AuthContextType {
    AccessToken: string | null;
    RefreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
  }

  export interface FormData {
    username: string;
    password: string;
    confirmPassword?: string;
  }

  