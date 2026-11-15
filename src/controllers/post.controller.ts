import type { IncomingMessage, ServerResponse } from "node:http";
import { blogServices, createBlog } from "../services/blog.service";
import type { IBlog } from "../types/blogtype";
import { sendResponsed } from "../utils/sendResponsed";
import { bodyPerser } from "../utils/bodyPerser";

export const postController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlperams = url?.split("/");

  const id =
    urlperams && urlperams[1] === "blogs" ? Number(urlperams[2]) : null;
  //   console.log(id);

  if (url === "/blogs" && method === "GET") {
    // const blogs = [
    //   {
    //     id: 1,
    //     title: "Getting Started with JavaScript",
    //     description:
    //       "Learn the basics of JavaScript and understand how it makes websites interactive.",
    //     author: "Mahafuzar Rahman",
    //     category: "Programming",
    //     tags: ["JavaScript", "Web Development", "Beginner"],
    //     image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
    //     content:
    //       "JavaScript is one of the most popular programming languages. It helps developers create interactive and dynamic websites. Beginners can start by learning variables, data types, functions, and loops.",
    //     createdAt: "2026-11-10",
    //     updatedAt: "2026-11-10",
    //     isPublished: true,
    //   },
    //   {
    //     id: 2,
    //     title: "Why Should You Learn TypeScript?",
    //     description:
    //       "Discover how TypeScript makes JavaScript development safer and easier.",
    //     author: "John Smith",
    //     category: "Programming",
    //     tags: ["TypeScript", "JavaScript", "Web Development"],
    //     image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    //     content:
    //       "TypeScript is a programming language built on JavaScript. It adds static typing, which helps developers find errors before running their code. It is especially useful for large applications and team projects.",
    //     createdAt: "2026-11-12",
    //     updatedAt: "2026-11-12",
    //     isPublished: true,
    //   },
    //   {
    //     id: 3,
    //     title: "Introduction to Node.js",
    //     description:
    //       "Understand Node.js and learn how to build backend applications using JavaScript.",
    //     author: "Alex Morgan",
    //     category: "Backend Development",
    //     tags: ["Node.js", "Backend", "JavaScript"],
    //     image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    //     content:
    //       "Node.js is a JavaScript runtime environment that allows developers to run JavaScript outside the browser. It is commonly used to build servers, REST APIs, and backend applications.",
    //     createdAt: "2026-11-14",
    //     updatedAt: "2026-11-14",
    //     isPublished: true,
    //   },
    // ];
    const blogs = blogServices();
    console.log(blogs);
    res.writeHead(200, { "content-type": "application/JSON" });
    res.end(JSON.stringify({ message: "This is blog route", data: blogs }));
  } else if (method === "GET" && id !== null) {
    const blogs = blogServices();

    const blog = blogs.find((b: IBlog) => b.id === id);
    if (!blog) {
      sendResponsed(res, 404, false, "blog not found");
    }
    try {
      sendResponsed(res, 200, true, "This is blog page", blog);
    } catch (error) {
      sendResponsed(res, 500, false, "Internal server");
    }
  } else if (method === "POST" && url === "/blogs") {
    const body = await bodyPerser(req);
    const blogs = blogServices();

    const newBlog = {
      id: Date.now(),
      ...body,
    };
    blogs.push(newBlog);
    createBlog(blogs);

    try {
      sendResponsed(res, 201, true, "Blog post successfull", newBlog);
    } catch (error) {
      sendResponsed(res, 500, false, "Internal server");
    }
  } else if (method === "PUT" && id !== null) {
    const body = await bodyPerser(req);
    const blogs = blogServices();

    const index = blogs.findIndex((b: IBlog) => b.id === id);
    console.log(index);
    blogs[index] = { id: blogs[index].id, ...body };
    createBlog(blogs);

    res.writeHead(200, { "content-type": "application/JSON" });
    res.end(JSON.stringify({ message: "Blog Upadate successful" }));

    if (index < 0) {
      return sendResponsed(res, 404, false, "Products not found");
    }

    try {
      sendResponsed(res, 200, true, "Blog Upadate successful");
    } catch (error) {
      sendResponsed(res, 500, false, "Internal server");
    }
  } else if (method === "DELETE" && id !== null) {
    const blogs = blogServices();
    const index = blogs.findIndex((b: IBlog) => b.id === id);
    blogs.splice(index, 1);
    createBlog(blogs);

    if (index < 0) {
      return sendResponsed(res, 404, false, "Products not found");
    }

    try {
      sendResponsed(res, 200, true, "Blog delete successful");
    } catch (error) {
      sendResponsed(res, 500, false, "Internal server");
    }
  }
};
