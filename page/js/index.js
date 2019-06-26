let everyDay  = new Vue({ // 每日一句 组件
    el:"#every_day",
    data:{
        content:'asdfasdfasdfasdfasdf'
    },
    computed:{
        getContent(){
            return this.content;
        }
    },
    created(){
    //    请求数据给content 赋值
    //    使用axios
        axios({
            method:'get',
            url:'/queryEveryDay'
        }).then(resp => {
            // console.log(resp);
            // console.log(this);
            // console.log(resp.data.data[0].content);
            this.content = resp.data.data[0].content;
            }
        ).catch(resp =>{
            console.log('请求每日一句失败',resp);
        });
    }
});


//文章列表组件
let articleList = new Vue({
    el:"#article_list",
    data:{
        page:1,//当前页数
        pageSize:5,//每页显示多少篇
        count:100,// 总页数
        pageNumList:[],//记录页数 和 当前页信息
        articleList:[
            // {   title: "四联杀幽门螺杆菌第三天",
            //     content: "前段时间总是干呕嗳气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。首次医院门诊，医生说是可能是胃动力不足消化不良，给开了点儿中成药，没要。问医生是否可以做一下钡餐或胃镜检查一下，于是预约了第二天的胃镜。第一次做胃镜，很顺利。胃镜报告显示胃角C2慢性萎缩性胃炎。几天后活检的病理结果显示慢性萎缩性胃炎，中度萎缩，中度炎症，中度活动，中度肠上皮化生，HP++……好...",
            //     date: "2018-10-10",
            //     views: "101",
            //     tags: "test1 test2",
            //     id: "1",
            //     link: ""
            // },
            // {   title: "四联杀幽门螺杆菌第三天",
            //     content: "前段时间总是干呕嗳气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。首次医院门诊，医生说是可能是胃动力不足消化不良，给开了点儿中成药，没要。问医生是否可以做一下钡餐或胃镜检查一下，于是预约了第二天的胃镜。第一次做胃镜，很顺利。胃镜报告显示胃角C2慢性萎缩性胃炎。几天后活检的病理结果显示慢性萎缩性胃炎，中度萎缩，中度炎症，中度活动，中度肠上皮化生，HP++……好...",
            //     date: "2018-10-10",
            //     views: "101",
            //     tags: "test1 test2",
            //     id: "1",
            //     link: ""
            // },
            // {   title: "四联杀幽门螺杆菌第三天",
            //     content: "前段时间总是干呕嗳气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。首次医院门诊，医生说是可能是胃动力不足消化不良，给开了点儿中成药，没要。问医生是否可以做一下钡餐或胃镜检查一下，于是预约了第二天的胃镜。第一次做胃镜，很顺利。胃镜报告显示胃角C2慢性萎缩性胃炎。几天后活检的病理结果显示慢性萎缩性胃炎，中度萎缩，中度炎症，中度活动，中度肠上皮化生，HP++……好...",
            //     date: "2018-10-10",
            //     views: "101",
            //     tags: "test1 test2",
            //     id: "1",
            //     link: ""
            // },{   title: "四联杀幽门螺杆菌第三天",
            //     content: "前段时间总是干呕嗳气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。首次医院门诊，医生说是可能是胃动力不足消化不良，给开了点儿中成药，没要。问医生是否可以做一下钡餐或胃镜检查一下，于是预约了第二天的胃镜。第一次做胃镜，很顺利。胃镜报告显示胃角C2慢性萎缩性胃炎。几天后活检的病理结果显示慢性萎缩性胃炎，中度萎缩，中度炎症，中度活动，中度肠上皮化生，HP++……好...",
            //     date: "2018-10-10",
            //     views: "101",
            //     tags: "test1 test2",
            //     id: "1",
            //     link: ""
            // }
        ]
    },
    computed:{
        getTime(){
            return (time) =>{
                let now = new Date(time*1000);////数据库里存着的是毫秒
                return now.getFullYear() + '年' + now.getMonth() + '月' + now.getDay() + '日';
            }
        },
        jumpTo(){
            return (page) =>{
                this.getPage(page,this.pageSize);
            }
        },
         getPage() {

             return (page,pageSize) => {
                 // 如果 是点击了标签 筛选文章 则 保存 标签
                 let searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : [];
                     let tag = '';
                     let bid = '';
                     searcheUrlParams.forEach(ele =>{
                          if(ele.split('=')[0] == 'tag'){
                              try{
                                   tag = ele.split('=')[1];
                              }catch(e){
                                  console.log(e);
                              }
                          }else if(ele.split('=')[0] == 'bid'){
                              try{
                                  bid = ele.split('=')[1];
                              }catch(e){
                                  console.log(e);
                              }
                          }
                      });
                      console.log(tag,bid);
                     if(tag == '' && bid == ''){// 不是 筛选
                         axios({//获取文章信息
                             method:'get',
                            url:`/queryBlogByPage?page=${page - 1}&pageSize=${pageSize}`,// 数据库文章是从0 开始的所以-1
                         }).then(resp =>{
                             let result = resp.data.data;
                             let list = [];

                             for(let i = 0; i < result.length; i++){
                                 var temp = {}
                                 temp.title = result[i].title;
                                 temp.content = result[i].content;
                                 temp.date = result[i].ctime;
                                 temp.view = result[i].view;
                                 temp.tags = result[i].tags;
                                 temp.id = result[i].id;
                                 temp.link = `blog_detail.html?bid=${result[i].id}`;//文章详情 页面 根据文章id不同渲染的页面
                                 list.push(temp);
                             }
                             articleList.articleList = list;
                             articleList.page = page;//设置当前页
                             // console.log(result);
                         }).catch(resp => {
                             console.log(resp);
                         });
                         //获取 页面总页数 之后才能渲染 分页插件
                         axios({
                             url:'queryBlogCount',
                             method:'get'
                         }).then(resp =>{
                             // console.log(resp);
                             this.count = resp.data.data[0].count;
                             this.generatePageTool;
                         }).catch(resp =>{
                             console.log(resp);
                         })
                     }else if(bid == '' && tag != ''){ // 标签筛选  需要 传入 现在是第几页 每页显示多少  标签名

                          axios({
                              method:'get',
                              url:`/queryByTagAndPage?page=${page-1}&pageSize=${pageSize}&tag=${tag}`
                          }).then(resp =>{
                              // console.log(1,resp);
                              var result = resp.data.data;
                              var list = [];
                              for (var i = 0 ; i < result.length ; i ++) {
                                  var temp = {};
                                  temp.title = result[i].title;
                                  temp.content = result[i].content;
                                  temp.date = result[i].ctime;
                                  temp.view = result[i].view;
                                  temp.tags = result[i].tags;
                                  temp.id = result[i].id;
                                  temp.link = "/blog_detail.html?bid=" + result[i].id;
                                  list.push(temp);
                              }
                              this.articleList = list;
                              this.page = page;
                          }).catch(() =>{
                              console.log('根据标签筛选失败')
                          });
                     //     根据 tag 查看文章的总数
                         axios({
                             method: "get",
                             url: "/queryByTagCount?tag=" + tag
                         }).then(resp =>{
                             // console.log(resp);
                             this.count = resp.data.data[0].count;
                             this.generatePageTool;
                         }).catch(()=>{
                             console.log('根据tag查看文章总数失败')
                         })
                     }else if(bid != '' && tag == ''){
                     //      根据文章 id 查询文章
                         axios({
                             method:'get',
                             url:`queryBlogByIdArr?bid=${bid}&page=${page-1}&pageSize=${pageSize}`
                         }).then(resp =>{
                             console.log(resp);
                             var result = resp.data.data;
                             var list = [];
                             for (var i = 0 ; i < result.length ; i ++) {
                                 var temp = {};
                                 temp.title = result[i].title;
                                 temp.content = result[i].content;
                                 temp.date = result[i].ctime;
                                 temp.view = result[i].view;
                                 temp.tags = result[i].tags;
                                 temp.id = result[i].id;
                                 temp.link = "/blog_detail.html?bid=" + result[i].id;
                                 list.push(temp);
                             }
                             this.articleList = list;
                             this.page = page;
                         //     渲染 分页插件
                             this.count = result.length;
                             this.generatePageTool;
                         }).catch(() =>{
                             console.log('根据文章id数组获取文章列表失败');
                         })
                     }

             }
         },
        generatePageTool(){
             let nowPage = this.page;
             let pageSize = this.pageSize;
             let totalCount = this.count;
             let result = [];
             result.push({text:'<<',page:1});// 回到第一页
             //当前页前后最多两个
            if(nowPage > 2){ // 当前页 前两个
                result.push({text:nowPage -2,page:nowPage - 2});
            }
            if(nowPage > 1){// 当前页为2 的时候为   前面为一个
                result.push({text:nowPage -1,page:nowPage - 1});
            }
             result.push({text:nowPage,page:nowPage});//当前页数
            // 总页数 为 总数 加上 最多余数 -1 / 每页篇数
            if(nowPage + 1 <= (totalCount + pageSize -1) / pageSize){
                result.push({text:nowPage + 1, page:nowPage + 1});
            }
            if(nowPage + 2 <= (totalCount + pageSize -1) / pageSize){
                result.push({text:nowPage + 2, page:nowPage + 2});
            }
            result.push({text:'>>',page:parseInt((totalCount + pageSize - 1) / pageSize)});
        //    回到最后一页
        this.pageNumList = result;
         }
    },
    created(){
        // 根据 页面 获取文章列表
          this.getPage(this.page,this.pageSize);
    }
});
