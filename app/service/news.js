const Service = require('egg').Service;
const cheerio =require("cheerio");
//获取数据
var parseDom= async function (node) {
    var dom = node(".cover-col-4 li");
    var dataList = [];
    dom.each(function(val){
        let item = {
            url: "",
            title: "",
            describe: "",
            score: ""
        }
        let imgSrc = node(this).find(".cover").children("img").attr("src");
        let title = node(this).find(".detail-frame a").text();

        let score = node(this).find(".color-lightgray").text();
        // let reg = new RegExp("\n",g);
        let describe = node(this).find(".detail-frame p").last().text();
        item.url = imgSrc;
        item.title = title;
        item.describe = describe;
        item.score = score
        dataList.push(item)
    })
    return dataList
};

class NewsService extends Service {
    async list () {
        let url ="https://book.douban.com/latest?icn=index-latestbook-all";
        const data = await this.ctx.curl(url,{dataType:"text"});
        let $ = cheerio.load(data.res.data);
        let dataList = await parseDom($);
        return dataList
    }
}

module.exports = NewsService;
