import { drizzle } from "drizzle-orm/node-postgres";
import { dbPool } from "@/db/dbpool";

export const db = drizzle({ client: dbPool });