import { Pool } from "pg";
import fs from "fs";

export const pool = new Pool();

export const applyMigrations = async () => {
  const client = await pool.connect();
  const cwd = process.cwd();
  const files = (await fs.promises.readdir(`${cwd}/migrations`, "utf-8"))
    .filter((file) => file.includes("up"))
    .sort((a, b) => Number(a.split(".")[0]) - Number(b.split(".")[0]));
  for (let i = 0; i < files.length; i++) {
    try {
      const sql = await fs.promises.readFile(
        `${cwd}/migrations/${files[i]}`,
        "utf-8"
      );
      await client.query(sql);
      console.log(`APPLIED MIGRATION ${files[i]}`);
    } catch (e) {
      console.log(`ERROR APPLYING MIGRATION ${files[i]}`, e);
      throw `ERROR APPLYING MIGRATION ${files[i]}`;
    }
  }
};

export const getUserData = () => {};

export const saveUserData = () => {};
