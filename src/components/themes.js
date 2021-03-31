import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  bgColor: '#fafafa',
  todoBgColor: '#fff',
  fontColor: '#494C6B',
  lineColor: '#E3E4F1',
  bannerImg: "url('/img/mountain.png')",
  checkBoxBorder: 'linear-gradient(#E3E4F1, #E3E4F1)',
  hoverColor: '#3A7CFD'
}

export const darkTheme = {
  bgColor: '#171823',
  todoBgColor: '#25273D',
  fontColor: '#C8CBE7',
  lineColor: '#393A4B',
  bannerImg: "url('/img/night.png')",
  checkBoxBorder: 'linear-gradient(120deg, rgba(85,221,255,1) 0%, rgba(192,88,243,1) 100%)',
  hoverColor: '#fafafa'
}

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bgColor};
    transition: all .2s;
  }
`
