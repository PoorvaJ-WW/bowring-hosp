// src/types/common.ts
export interface StyleColors {
  backgroundColor?: string;
  color?: string;
}

export interface Logo {
  src: string;
  alt: string;
  type?: string;
  mode?: string;
}

export interface NavigationItem {
  name: string;
  text: string;
  href: string;
  link: string;
}




export interface ColorModeValues {
  light: string;
  dark: string;
}

export interface CustomColors {
  primary: ColorModeValues;
  secondary: ColorModeValues;
}