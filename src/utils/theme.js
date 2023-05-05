const FONTS = {
  DEFAULT: "Public Sans, Open Sans, sans-serif",
  HEADINGS: "JetBrains Mono, Consolas, monospace",
};

const THEME = {
  fontFamily: FONTS.DEFAULT,
  headings: {
    fontFamily: FONTS.HEADINGS,
  },
  components: {
    AppShell: {
      styles: (theme) => ({
        main: {
          backgroundColor: theme.colors["gray"][1],
          zIndex: 0,
        },
      }),
    },
    Text: {
      styles: {
        root: {
          userSelect: "none",
        },
      },
    },
    Switch: {
      styles: (theme) => ({
        label: {
          userSelect: "none",
        },
        track: {
          backgroundColor: theme.colors["dark"][1],
          borderColor: theme.colors["dark"][1],
        },
      }),
    },
    Dialog: {
      styles: {
        root: {
          ".dialog-header": {
            padding: "1rem 0 1rem 0",
            margin: "-1rem 0 0 0",
            cursor: "grab",
            ":active": {
              cursor: "grabbing",
            },
          },
        },
      },
    },
  },
};

export default THEME;
