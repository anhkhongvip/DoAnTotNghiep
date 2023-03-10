import { Request, Response } from "express";
class HomeController {
  loginPage(req: Request, res: Response): void {
    res.render("login");
  }

  registerPage(req: Request, res: Response): void {
    res.render("register");
  }
  
}
