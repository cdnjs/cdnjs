import { cwd } from "node:process";


export const contextUri = () => `file://${cwd()}/`;
