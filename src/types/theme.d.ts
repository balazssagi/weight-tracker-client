import { Color } from '@material-ui/core'
import { PaletteColor } from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    successColor: PaletteColor
  }
  interface ThemeOptions {
    successColor: PaletteColor
  }
}
