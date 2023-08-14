import React, { useState, useEffect }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './screens/MyStack';
import * as Font from 'expo-font';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'GowunBatang-Bold': require('./assets/fonts/GowunBatang-Bold.ttf'),
        'GowunBatang-Regular' : require('./assets/fonts/GowunBatang-Regular.ttf'),
        'PTSerif-BoldItalic': require('./assets/fonts/PTSerif-BoldItalic.ttf'),
        'PTSerif-Regular': require('./assets/fonts/PTSerif-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
