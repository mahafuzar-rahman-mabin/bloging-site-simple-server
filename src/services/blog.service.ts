import fs from "fs";
import path from "node:path";
import type { IBlog } from "../types/blogtype";

const filepath = path.join(process.cwd(), "./src/database/db.json");

export const blogServices = () => {
  //   console.log(filepath);
  const result = fs.readFileSync(filepath, "utf-8");

  return JSON.parse(result);
};

export const createBlog = (blogLoad: IBlog) => {
  fs.writeFileSync(filepath, JSON.stringify(blogLoad));
  // console.log(blogLoad);
};
