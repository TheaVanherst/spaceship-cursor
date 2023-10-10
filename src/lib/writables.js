
import { writable } from "svelte/store";

const
    screenSize = writable(0),
    deviceType = writable(0),
    scrollPos  = writable(0);

export { screenSize, deviceType, scrollPos }