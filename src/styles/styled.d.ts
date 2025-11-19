import 'styled-components';
import { Theme } from './GlobalStyles';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
