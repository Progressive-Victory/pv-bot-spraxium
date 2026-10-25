import { PVApiConnection } from "./PVApiConnection";

export * from "./routes";
export type * from "./types";

const host = process.env.PV_API_URL!;
const token = process.env.DISCORD_TOKEN!;

const pvApiConnection = new PVApiConnection({ host });

pvApiConnection.auth(token);

export { pvApiConnection }