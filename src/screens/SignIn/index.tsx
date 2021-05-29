import React, { useState } from "react";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import SignInSocialButton from "../../components/SignInSocialButton/index";
import { useAuth } from "../../hooks/auth";
import { Alert, ActivityIndicator, Platform } from "react-native";
import { useTheme } from "styled-components";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { SignInWithGoogle, SignInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await SignInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Nao foi possivel se conectar com a conta Google");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await SignInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Nao foi possivel se conectar com a conta Apple");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 16 }}
          />
        )}
      </Footer>
    </Container>
  );
};

export default SignIn;
