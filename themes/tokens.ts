export const tokens = {
    base: {
        white: "0 0% 100%",
        black: "0 0% 0%",
        gray: {
            50: "0 0% 96%",  // secondary, muted, accent (light)
            100: "0 0% 89%", // border, input (light)
            200: "0 0% 80%",
            300: "0 0% 70%",
            400: "0 0% 63%", // muted-foreground (dark)
            500: "0 0% 45%", // muted-foreground (light)
            600: "0 0% 30%",
            700: "0 0% 20%", // border, input (dark)
            800: "0 0% 14%", // secondary, muted, accent (dark)
            900: "0 0% 4%",  // card, popover (dark)
            950: "0 0% 0%",  // background (dark)
        },
        red: {
            500: "0 84% 60%", // destructive (light)
            600: "0 74% 50%", // destructive (dark)
        },
    },
} as const
