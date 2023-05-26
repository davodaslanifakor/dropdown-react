const scroll = {
    "&::-webkit-scrollbar": {
        // General scrollbar
        width: "5px",
        height: "5px"
    },
    "&::-webkit-scrollbar-button": {
        // Side buttons
        width: "0px",
        height: "0px"
    },
    "&::-webkit-scrollbar-thumb": {
        // Scrollbar slider
        background: "#999",
        borderRadius: "2px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
        // Slider hover
        background: "#777"
    },
    "&::-webkit-scrollbar-thumb:active": {
        // Slider active
        background: "#555"
    },
    "&::-webkit-scrollbar-track": {
        // Scrollbar track
        background: "transparent",
        borderRadius: "2px"
    },
    "&::-webkit-scrollbar-track:hover": {
        // Track hover
        background: "#ccc"
    },
    "&::-webkit-scrollbar-track:active": {
        // Track active
        background: "#ccc"
    },
    "&::-webkit-scrollbar-corner": {
        // Scrollbar corners where scrollbars meet
        background: "transparent"
    }
}

export default scroll
