import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  fonts: {
    heading: "var(--font-playfair), Georgia, serif",
    body: "var(--font-inter), system-ui, -apple-system, sans-serif",
  },
  semanticTokens: {
    colors: {
      "app.bg": { default: "#FBEDDF", _dark: "#140E0B" },
      "app.surface": { default: "#FFF7EE", _dark: "#1C130F" },
      "app.card": { default: "#FFFAF4", _dark: "#231812" },
      "app.cardAlt": { default: "#F7E6D4", _dark: "#2E2018" },
      "app.border": { default: "#EBD6C2", _dark: "#3A2A20" },
      "app.text": { default: "#3A2216", _dark: "#F4E4D4" },
      "app.muted": { default: "#8C705E", _dark: "#A98F7B" },
      "app.brand": { default: "#7B4527", _dark: "#C98B58" },
      "app.brandHover": { default: "#623520", _dark: "#D9A070" },
      "app.brandText": { default: "#FFF4E8", _dark: "#2A170C" },
      "app.accent": { default: "#B8703D", _dark: "#E0A26B" },
      "app.danger": { default: "#C2412D", _dark: "#F0705C" },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "app.bg",
        color: "app.text",
        minHeight: "100dvh",
      },
      "*::selection": { bg: "app.brand", color: "app.brandText" },
      ".hide-scroll": { scrollbarWidth: "none" },
      ".hide-scroll::-webkit-scrollbar": { display: "none" },
    },
  },
  components: {
    Button: {
      baseStyle: { fontWeight: 600, rounded: "full" },
      variants: {
        brand: {
          bg: "app.brand",
          color: "app.brandText",
          _hover: { bg: "app.brandHover", _disabled: { bg: "app.brand" } },
          _active: { bg: "app.brandHover" },
        },
        soft: {
          bg: "app.cardAlt",
          color: "app.text",
          border: "1px solid",
          borderColor: "app.border",
          _hover: { bg: "app.border" },
          _active: { bg: "app.border" },
        },
        outlineApp: {
          bg: "transparent",
          color: "app.text",
          border: "1px solid",
          borderColor: "app.border",
          _hover: { bg: "app.cardAlt" },
        },
        ghostApp: {
          bg: "transparent",
          color: "app.text",
          _hover: { bg: "app.cardAlt" },
          _active: { bg: "app.border" },
        },
      },
      defaultProps: { variant: "brand" },
    },
    Input: {
      variants: {
        app: {
          field: {
            bg: "app.cardAlt",
            border: "1px solid",
            borderColor: "app.border",
            rounded: "xl",
            color: "app.text",
            _placeholder: { color: "app.muted" },
            _hover: { borderColor: "app.muted" },
            _focusVisible: {
              borderColor: "app.brand",
              boxShadow: "0 0 0 1px var(--chakra-colors-app-brand)",
            },
          },
        },
      },
      defaultProps: { variant: "app" },
    },
    Textarea: {
      variants: {
        app: {
          bg: "app.cardAlt",
          border: "1px solid",
          borderColor: "app.border",
          rounded: "xl",
          color: "app.text",
          _placeholder: { color: "app.muted" },
          _focusVisible: {
            borderColor: "app.brand",
            boxShadow: "0 0 0 1px var(--chakra-colors-app-brand)",
          },
        },
      },
      defaultProps: { variant: "app" },
    },
    Tag: {
      variants: {
        app: {
          container: {
            bg: "app.cardAlt",
            color: "app.muted",
            rounded: "md",
            fontWeight: 500,
          },
        },
      },
      defaultProps: { variant: "app" },
    },
    Modal: {
      baseStyle: {
        dialog: { bg: "app.card", color: "app.text", rounded: "2xl" },
        overlay: { backdropFilter: "blur(4px)" },
      },
    },
    Drawer: {
      baseStyle: { dialog: { bg: "app.card", color: "app.text" } },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "app.card",
          borderColor: "app.border",
          rounded: "xl",
          py: 2,
          shadow: "xl",
        },
        item: {
          bg: "transparent",
          _hover: { bg: "app.cardAlt" },
          _focus: { bg: "app.cardAlt" },
        },
      },
    },
    Popover: {
      baseStyle: {
        content: {
          bg: "app.card",
          borderColor: "app.border",
          rounded: "xl",
          shadow: "xl",
        },
      },
    },
    Divider: { baseStyle: { borderColor: "app.border" } },
  },
});

// Chakra's default Avatar style calls Math.random() while rendering (via
// randomColor), which Next 16 Cache Components / partial prefetching rejects.
// Replace its base style with a deterministic one (no randomness).
theme.components.Avatar = {
  ...theme.components.Avatar,
  baseStyle: () => ({
    badge: {
      borderRadius: "full",
      border: "0.2em solid",
      borderColor: "var(--avatar-border-color)",
      "--avatar-border-color": "var(--chakra-colors-app-bg)",
    },
    excessLabel: {
      bg: "var(--avatar-bg)",
      fontSize: "var(--avatar-font-size)",
      width: "var(--avatar-size)",
      height: "var(--avatar-size)",
      lineHeight: "1",
      "--avatar-bg": "var(--chakra-colors-app-cardAlt)",
    },
    container: {
      bg: "var(--avatar-bg)",
      fontSize: "var(--avatar-font-size)",
      color: "var(--chakra-colors-app-brandText)",
      borderColor: "var(--avatar-border-color)",
      verticalAlign: "top",
      width: "var(--avatar-size)",
      height: "var(--avatar-size)",
      "--avatar-border-color": "var(--chakra-colors-app-card)",
      "&:not([data-loaded])": { "--avatar-bg": "var(--chakra-colors-app-brand)" },
    },
    label: { fontSize: "var(--avatar-font-size)", lineHeight: "1" },
  }),
};

export default theme;
