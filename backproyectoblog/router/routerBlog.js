import express from "express";
import { getblogscontroller,getblogcontroller,getblogpopuladocontroller,createblogcontroller,updateblogcontroller,deleteblogcontroller } from "../controller/controllerBlog.js";

const routerBlog = express.Router();

routerBlog.get("/",getblogscontroller)
routerBlog.get("/populado/:id",getblogpopuladocontroller)
routerBlog.get("/:id",getblogcontroller) 
routerBlog.post("/",createblogcontroller) 
routerBlog.put("/:id",updateblogcontroller)
routerBlog.delete("/:id",deleteblogcontroller)

export default routerBlog;