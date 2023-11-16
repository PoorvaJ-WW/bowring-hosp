
// src/types/header.ts
import { NavigationItem, Logo } from './common';
import { Theme } from './theme';


export interface HeaderLogo {
  light: Logo;
  dark: Logo;
}

export interface HeaderContent {
  navigation: NavigationItem[];
  logo: HeaderLogo;
  mobile_menu?: boolean;
}



export interface HeaderProps {
  content: HeaderContent;
  theme: Theme;
  onThemeToggle: () => void;
}
