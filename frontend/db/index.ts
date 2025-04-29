import { drizzle } from "drizzle-orm/node-postgres";
import { dbPool } from "@/lib/database";

export const db = drizzle({ client: dbPool });