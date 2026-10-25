import { PVApiConnection } from "./PVApiConnection";

export * from "./routes";
export type * from "./types";


const host = process.env.PV_API_URL!;

const pvApiConnection = new PVApiConnection({ host });

pvApiConnection.auth(process.env.PV_DISCORD_TOKEN!);