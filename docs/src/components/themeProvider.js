import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import * as React from 'react';
import Header from './Header';
import './styles.css';
import { default as defaultTheme } from './theme';

export default function ThemeProvider({ children, theme = {}, location }) {
  return (
    <div>
      <Header location={ location }/>
      <EmotionThemeProvider theme={ { ...defaultTheme, ...theme } }>
        { children }
      </EmotionThemeProvider>
    </div>
  );
}
