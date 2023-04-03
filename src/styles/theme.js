import { extendTheme } from "@chakra-ui/react";

//Inclui custom option
const customTheme = {
    components: {
        Lis: {
            variant: {
                customStyle: {
                    bg: "black",
                    color: "white",
                    
                  
                }
            }
        }
    }
}




const theme = extendTheme(customTheme);

export default theme;
