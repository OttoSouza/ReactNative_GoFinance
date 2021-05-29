# Iniciando aplicacao

Para iniciar uma aplaicação em expo utilize o comando: 

expo init "Nome do projeto"

Depois ira aparecer algumas opçoes, recomendo utilizar com 
minimal - typescript
Isso significa que as pastas de ios e android irao vim separadas
podendo fazer alteraçoes especificar para android e ios

# Styled-Components

yarn add styled-components
yarn add @types/styled-components-react-native -D

Uma dependencia para dar super poder a sua interface.


## Gerando o tema gobal e tipando

Crie um arquivo styled.d.ts e dentro dele configure as tipagens do styled para receber cores personalizadas.

acesse - global/styles/styled.d.ts

Veja as configuracoes

Precisa que dentro do arquivo App.tsx use o contexto de ThemeContext do styled components para repassar tudo o que voce colocou dentro dos seus temas, como cores, fontes , tamanhos etc.

# Google Fontes

Para instalaçao das fontes basta usar o comando abaixo e o nome da fonte que deseja utilizar;

- expo install expo-font @expo-google-fonts/"nome da fonte"

Para começar a usar as fonts va ate o App.tsx e la dentro precisamos importar qual tipo da fonte desejamos utilizar.

As fontes elas demoram um pouco para serem carregadas. Com isso existe dentro do expo uma dependencia chamda app-loading

- expo install expo-app-loading

Esse carinha serve para dizer olhe enquanto as fontes nao forem carregadas, fique no aguardo.

Entre dentro do App.tsx e veja como fazer essas importacoes


Lembrando que todas as cores e fontes estao sendo passadas para dentro da pasta src/global/styles/theme.ts

Aqui é o gerenciamento das cores e fontes.

# Medidas (densidade de pixel)

No iphone 4 veio com uma nova tecnologia de retina, com isso os px foram divididos em 2, que sao: 

Px de hardware - é o ponto de luz na tela.
Px de sofware - conectado com as densidades de tela. Imagine diversos dispositivos de modelos diferentes e imagine um botao o mesmo botao em todos os dispositivos. Dependendo o dispositivo esse botao pode ficar mais fino, ou mais grosso isso ira depender da densidade, ou seja, em iphones a quantidade de px que pode caber na tela seria mais que em um android.

Independencia de Densidade
Tem como objetivo renderizar os elementos de uma forma independente do dispositivo. GOOLE criou uma nova forma para android chamada DPI.
IPHONE - POINTS.


Para utilizar fonts responsivas: yarn add react-native-responsive-fontsize


# Icones

O proprio expo tras varios icones para utilizacao
@expo/vector-icons


# Botoes

Para usar os botoes tanto no ios quanto android e que seja personalizado troque a view por GestureHandlerRootView da lib "react-native-gesture-handler"

# Input

Para utilizaçao dos inputs sera utilizado a dependencia react-hook-forms. Serve para otimizar a aplicacao.

# Navegacao 
React-navigation

# AsyncStorage

Armazena os dados no dispositivo do usuario.
Esse armazenamento chave e valor como se fosse d otipo JSON


# Graficos

victory-native- dependecia para criaçao de graficos

# Autenticaçao 

Autenticacao - verificar o usuario e realizando uma verificaçao se o mesmo existe, se sim mostre os dados do mesmo.
Com isso podemos separar as rotas privadas e publicas.
O usuario podera acessar com uma conta google ou apple
Se o usuario tiver uma das contas -> Exiba a aplicaçao
Se nao, fica na tela de login ate entrar.


Configurar com a google

https://docs.expo.io/versions/latest/sdk/google/
https://docs.expo.io/guides/authentication/

# Contexto

Local onde as informaçoes sao compartilhadas por toda a aplicacao.
Entao o usuario tem uma lista de produto.
Preciso verificar se o usuario existe, se existir pegue todos os produtos e exiba em tela.
Preciso manter todas as informaçoes em um unico local para manipula-los.
