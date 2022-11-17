// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        textColor: string;
        textBlackColor: string;
        bgColor: string;
        accentColor: string;
        displayBgColor: string;
    }
}
