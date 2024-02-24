import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  styles,
  config,
});

export default theme;