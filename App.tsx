import { NewGroup } from '@screens/NewGroup'
import { StatusBar } from 'react-native';

//Themes e Fonts
import { ThemeProvider } from 'styled-components'
import theme from './src/theme'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

//Components
import { Loading } from '@components/Loading';

export default function App() {

  //Carregar as fontes da aplicação
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
      {/* StatusBar para que o App inicie bem do topo do dispositivo */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent 
      />
      { fontsLoaded ? <NewGroup /> : <Loading  /> }
    </ThemeProvider>
  );
}

