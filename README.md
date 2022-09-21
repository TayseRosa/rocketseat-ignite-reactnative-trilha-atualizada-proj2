
<h1 align="center"> Project React Native - Rocketseat Ignite - Projeto 2 - Ignite Teams</h1>

# Demo
<img src="readme.jpeg" style="width: 30%; ">
<!-- <img src="readme.gif" style="width: 30%; "> -->

---

#Índice
- [Demo](#demo)
- [About the project](#about-the-project)
  - [Step to step for install lib babel-plugin-module-resolver](#step-to-step-for-install-lib-babel-plugin-module-resolver)
  - [Estilização com Styled Components](#estilização-com-styled-components)
  - [Definindo o tema da aplicação](#definindo-o-tema-da-aplicação)
  - [Como incluir fontes personalizadas em sua aplicação](#como-incluir-fontes-personalizadas-em-sua-aplicação)
  - [Utilizando attrs](#utilizando-attrs)
  - [StatusBar](#statusbar)
  - [Criar tipagens para imagens .png](#criar-tipagens-para-imagens-png)
  - [Adicionar a biblioteca phosphorIcons](#adicionar-a-biblioteca-phosphoricons)
  - [Estilizar Icons diretamente pelo styles.ts](#estilizar-icons-diretamente-pelo-stylests)
  - [Tipagem TouchableOpacityProps](#tipagem-touchableopacityprops)
  - [Flatlist](#flatlist)
  - [Criando um componente Input](#criando-um-componente-input)
  - [Estilizando Placeholder do Input](#estilizando-placeholder-do-input)
- [🚀 Technologies used in this project](#-technologies-used-in-this-project)
- [📥 How to use](#-how-to-use)
- [🚀 Developer](#-developer)
- [📞 Contact me](#-contact-me)

---

# About the project
Este é um projeto desenvolvido no Rocketseat Ignite - React Native - trilha atualizada - projeto 2



<h3>Translate English</h3>

This is a project developed at the Rocketseat Ignite  - React Native - updated trail - project 2


---

## Step to step for install lib babel-plugin-module-resolver
This lib is util for organizer folders 
```js
npm install --save-dev babel-plugin-module-resolver
```
e dentro de babel.config.js, fazer a seguinte configuraçao:
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
      'module-resolver',
      {
        root:['./src'],
        alias: {
          '@assets':'./src/assets',
          '@components':'./src/components',
          '@routes':'./src/routes',
          '@screens':'./src/screens',
          '@storage':'./src/storage',
          '@theme':'./src/theme',
          '@utils':'./src/utils',
        },
      },
    ],
  ],
  };
};

```
e dentro do tsconfig.json:
```js
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    
    "baseUrl": "./",
    "paths": {
      "@assets/*":["./src/assets/*"],
      "@components/*":["./src/components/*"],
      "@routes/*":["./src/routes/*"],
      "@screens/*":["./src/screens/*"],
      "@storage/*":["./src/storage/*"],
      "@theme/*":["./src/theme/*"],
      "@utils/*":["./src/utils/*"],
    }

  }
}
```
e importar de uma forma muito mais clean:
```js
import { Groups } from '@screens/Groups'
```

Font of lib: https://www.npmjs.com/package/babel-plugin-module-resolver

Feito!

---

## Estilização com Styled Components
Instalar a lib:
```js
npm install styled-components
npm install --save-dev @types/styled-components @types/styled-components-react-native
```
Feito!

---

## Definindo o tema da aplicação
Criar uma pasta em src/theme/index.ts
```js
export default {
    COLORS: {
      WHITE: '#FFFFFF',
  
      GREEN_700: '#00875F',
      GREEN_500: '#00B37E',
  
      RED: '#F75A68',
      RED_DARK: '#AA2834',
  
      GRAY_700: '#121214',
      GRAY_600: '#202024',
      GRAY_500: '#29292E',
      GRAY_400: '#323238',
      GRAY_300: '#7C7C8A',
      GRAY_200: '#C4C4CC',
      GRAY_100: '#E1E1E6'
    },
    FONT_FAMILY: {
      REGULAR: 'Roboto_400Regular',
      BOLD: 'Roboto_700Bold'
    },
    FONT_SIZE: {
      SM: 14,
      MD: 16,
      LG: 18,
      XL: 24
    }
  };
```

Deixar o tema disponivel na aplicação:
No App.tsx importar o Theme provider da seguinte forma:

```js
import { ThemeProvider } from 'styled-components'
import theme from './src/theme'
```
... e envolver a aplicação com o ThemeProvider da seguinte forma:

```js
import { Groups } from '@screens/Groups'

import { ThemeProvider } from 'styled-components'
import theme from './src/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
}
```
Criar uma tipagem para os temas e com isso, mostrar as opções pré-estabelecidas pelo tema:
criar uma pasta dentro de src @types/style.d.ts, e dentro do arquivo fica da seguinte forma:
```js
import 'styled-components';
import theme from '../theme';

declare module 'styled-components' {
    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType { }
}
```
Feito! Agora só usar o tema no seu styles.ts, como por exemplo:
```js
background-color:${({ theme }) => theme.COLORS.GRAY_700 };
```

Feito!

---

## Como incluir fontes personalizadas em sua aplicação
1- Pesquisa pela sua fonte em: https://fonts.google.com (por exemplo a fonte Roboto)

2- https://docs.expo.dev/versions/latest/sdk/font/

3- Instalar: npx expo install expo-font @expo-google-fonts/roboto

4- Em App.tsx:
```js
import { ActivityIndicator } from 'react-native';
import { Groups } from '@screens/Groups'

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { ThemeProvider } from 'styled-components'
import theme from './src/theme'

export default function App() {

  //Carregar as fontes da aplicação
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
      { ! fontsLoaded ? <Groups /> : <ActivityIndicator  /> }
    </ThemeProvider>
  );
}

```

Feito!

---

## Utilizando attrs
```js
export const LoadingIndicator = styled.ActivityIndicator.attrs(({ theme}) => ({
    color: theme.COLORS.GREEN_700
}))``;
```

Feito!

---

## StatusBar
Utilizando desde o inicio(topo) do dispositivo:
```js
return (
    <ThemeProvider theme={theme}>
      {/* Status bar para que o App inicie bem do topo do dispositivo */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent 
      />
      { fontsLoaded ? <Groups /> : <Loading  /> }
    </ThemeProvider>
  );
```

Feito!

---

## Criar tipagens para imagens .png
Quando o seu VSCode não reconhecer as importações de imagens .png, você precisa criar uma tipagem para isso da seguinte forma:
src/@types/png.d.ts
```js
declare module '*.png'
```
Pronto! O seu arquivo .png já será reconhecido.

---

## Adicionar a biblioteca phosphorIcons
Fonte: https://phosphoricons.com/
```js
npm install --save phosphor-react-native 
```
E agora, precisamos fazer a instalação do react-native-svg, para poder utilizar esses icones em nossa aplicação:
Fonte: https://docs.expo.dev/versions/latest/sdk/svg/

```js
npx expo install react-native-svg
```

E para utilizar os icons:
```js
import { CaretLeft } from 'phosphor-react-native';
.
.
.
<CaretLeft color="#fff" size={32} />
```
Pronto! Lib instalada!

---

## Estilizar Icons diretamente pelo styles.ts
styles.ts
```js
import styled from 'styled-components/native';
import { CaretLeft } from 'phosphor-react-native';

export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size:36,
  color:theme.COLORS.WHITE
}))``;

`;
```
index.tsx:
```js
import React from 'react';

import {
    Container,
    BackIcon
} from './styles'

export function Header() {
  return (
    <Container>
        <BackIcon color="#fff" />
    </Container>
  );
}
```

Feito!

---

## Tipagem TouchableOpacityProps

```js
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container,
    Icon,
    Title
 } from './styles';

 type Props = TouchableOpacityProps & {
    title: string
 }

export function GroupCard( { title, ...rest }: Props ) {
  return (
    <Container>
        <Icon />
        <Title> {title} </Title>
    </Container>
  );
}
```
E agora sim, quando damos um control + clique em onPress={}, aparecem as opções do TouchableOapcity

```js
<GroupCard title="Galera do Ignite" onPress={} />
```

Feito!

---

## Flatlist

```js
import React,{ useState } from 'react';
import { FlatList } from 'react-native';

import * as S from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

export function Groups() {
  const [ groups, setGroups ] = useState<string[]>(['Galera da Rocket!', 'Amigos', 'Família']);

  return (
    <S.Container>
      <Header />

      <Highlight
        title="Turmas"
        subtitle="Jogue com a sua turma"
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item })=> (
          <GroupCard 
            title={item} 
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex:1} }
        ListEmptyComponent={()=><ListEmpty message='Que tal cadastrar a primeira turma?' />}
      />
    </S.Container>
  );
}
```
Feito!

---

## Criando um componente Input
index.tsx
```js
import React from 'react';
import { TextInputProps } from 'react-native';

import { 
    Container
 } from './styles';

export function Input({...rest}: TextInputProps) {
  return (
    <Container 
      {...rest}
      
    />
  );
}
```
styles.ts
```js
import { TextInput } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TextInput)`
  flex:1;
  min-height: 56px;
  max-height:56px;

  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  color: ${({theme}) => theme.COLORS.WHITE};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;

  border-radius:6px;
  padding:16px;
`;
```

## Estilizando Placeholder do Input
Desenvolvendo o componente Input:
```js
import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { 
    Container
 } from './styles';

export function Input({...rest}: TextInputProps) {
  const { COLORS } = useTheme();

  return (
    <Container 
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}
```

Usando o componente Input
```js
<Input 
  placeholder="Nome da turma"
/>
```



# 🚀 Technologies used in this project
The project was developed using the following technologies:

- [x] Expo
- [x] Path Mapping com: babel-plugin-module-resolver (cria um alias para apontar para uma pasta do projeto, e assim, nao precisa voltar tantos niveis na estrutura de pastas para chegar em uma pasta especifica, deixando as importações menores)
- [x] Estilização com a lib styled-components
- [x] Design System
- [x] Theme com cores, fontes
- [x] 

# 📥 How to use
```js

    //Clone the repository
    $ git clone https://github.com/TayseRosa/
    
    //Enter directory
    $ cd 

    //Install dependencies
    $ npm install 

    //Start the project
    $ expo start
    

``` 

# 🚀 Developer

<a href="https://www.tayserosa.dev">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/31596454?v=4" width="100px;" alt="Tayse Rosa" style="border-radius:50%"/>
 <br />
 <sub><b>Tayse Rosa</b></sub></a> <a href="https://www.tayserosa.dev" title="Tayse Rosa">🚀</a>


<hr />

# 📞 Contact me

👋🏽 Entre em contato!


<a href="https://www.linkedin.com/in/tayse-rosa-3b683151/" target="_blank">
<img src="https://img.shields.io/static/v1?label=LinkedIn&message=Tayse Rosa&color=blue&style=for-the-badge&logo=linkedin"/>
</a>
<br/>
<br/>

<a href="https://github.com/TayseRosa/" target="_blank">
<img src="https://img.shields.io/static/v1?label=GitHub&message=Tayse Rosa&color=black&style=for-the-badge&logo=github"/>
</a>
<br/>
<br/>

<a href="https://api.whatsapp.com/send?phone=5551982368077" target="_blank">
<img src="https://img.shields.io/static/v1?label=whatsapp&message=Tayse Rosa&color=green&style=for-the-badge&logo=whatsapp"/>
</a>
<br/>
<br/>


<a href="https://www.tayserosa.dev" target="_blank">
<img src="https://img.shields.io/static/v1?label=Portfólio&message=Tayse Rosa&color=pink&style=for-the-badge&logo=portfolio"/>
</a>
<br/>
<br/>

<p style="text-align: center">Developer with ❤️ by Tayse Rosa</p>
