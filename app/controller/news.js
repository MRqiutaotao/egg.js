const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
      const ctx = this.ctx;
      const newsList = await ctx.service.news.list();
      const dataList = {
          list: newsList
      }
      console.log(typeof newsList,"debugsss")
    await this.ctx.render('news/index.tpl', dataList);
  }
}

module.exports = NewsController;
