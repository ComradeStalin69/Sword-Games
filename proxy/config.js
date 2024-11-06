export const config = {
    name: "Proxy",
    bindHost: "127.0.0.1",
    bindPort: 1,
    maxPlayers: 20,
    motd: {
        iconURL: "./sus.png",
        l1: "EaglercraftX 1.8 Proxy Demo",
        // leave this as "" if you want it to be empty
        // do NOT set this to null!
        l2: ""
    },
    server: {
        host: "127.0.0.1",
        port: 25565
    },
    security: {
        enabled: false,
        key: null,
        cert: null
    }
};
export const BRANDING = Object.freeze("EaglerXProxy");
export const VERSION = "1.0.0";
export const NETWORK_VERSION = Object.freeze(BRANDING + "/" + VERSION);
