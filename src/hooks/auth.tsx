import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

// Falar para o Context quais infomacoes que ele ira armazena no estado
interface AuthContextData {
  user: User;
  SignInWithGoogle(): Promise<void>;
  SignInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

// criando o contexto
const AuthContext = createContext({} as AuthContextData);

// Criando a funcao que ira retonar os dados para a aplicacao
// com isso tem o Provider que vem de dentro do AuthContext
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const userKey = "@gofinances:use";

  async function SignInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "835374225055-7esg41h7rkvc648m6s3f3mcgm10l9v87.apps.googleusercontent.com",
        androidClientId:
          "835374225055-eu68ct5kqsdapefcvc1kki8sa8ttr0vr.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function SignInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userKey);
  }

  // obter os valores dentro do dispositivo e verifica se existe algum usuario
  // se existir passe para o estado
  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userKey);
      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    }
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        SignInWithGoogle,
        SignInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Criando o hook de contexto personalizado
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
