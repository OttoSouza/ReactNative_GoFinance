import "styled-components"

import theme from "./theme";

declare module "styled-components" {
  // type of infere tudo que esta dentro de theme dentro de ThemeType
  // Entao ele copia a tipagem que esta dentro de theme para ThemeType
  // Estamos Tipando o tema
  type ThemeType = typeof theme
  
  export interface DefaultTheme extends ThemeType {}
}
