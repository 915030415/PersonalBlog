let randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[]
    },
    computed:{
        randomColor(){
            return function(){
                 let r = Math.random()*255 + 50;
                 let g = Math.random()*255 + 50;
                 let b = Math.random()*255 + 50;
                 return `rgb(${r},${g},${b})`;
            }
        },
        randomSize(){
            return function(){
                let fontSize = Math.random()*20 + 12 + 'px';
                return fontSize;
            }
        }
    },
    created() {
          axios({
              url:'/queryRandomTags',
              method:'get',
          }).then(resp =>{
             // console.log(resp);
             let result = [];
              for (let i = 0 ; i < resp.data.data.length ; i ++) {
                  result.push({text:resp.data.data[i].tag, link:"/?tag=" + resp.data.data[i].tag});
              }// 设置 link 点击 标签的时候 url 上设置上 参数 tag = ？
              this.tags = result;
          }).catch(resp =>{
              console.log('获取随机标签失败')
          });
    }
});
let newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[
            // {title:'这是一个标签哈哈哈哈哈哈哈',link:'www.baidu.com'},
            // {title:'这是一个标签哈哈哈哈哈哈哈',link:'www.baidu.com'},
            // {title:'这是一个标签哈哈哈哈哈哈哈',link:'www.baidu.com'},
            // {title:'这是一个标签哈哈哈哈哈哈哈',link:'www.baidu.com'},
            // {title:'这是一个标签哈哈哈哈哈哈哈',link:'www.baidu.com'},
            // {title:'这是一个标签哈哈哈哈哈哈哈',link:'www.baidu.com'},
            // {title:'这是一个标签哈哈哈哈哈哈哈',link:'www.baidu.com'}
            ]
    },
    created(){
        axios({
            method:'get',
            url:'queryHotBlog'
        }).then(resp =>{
           let result = [];
           for(let i = 0;i < resp.data.data.length; i++){
               let temp = {};
               temp.title = resp.data.data[i].title;
               temp.link = `/blog_detail.html?bid=${resp.data.data[i].id}`;
               result.push(temp);
           }
            this.titleList = result;

        }).catch(()=>{
            console.log('查询热门文章失败')
        })
    }
});
let newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList: [
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            // {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"}
        ]
    },
    computed:{
        getTime(){
            return (time) =>{
                let now = new Date(time*1000);////数据库里存着的是毫秒
                return now.getFullYear() + '年' + now.getMonth() + '月' + now.getDay() + '日';
            }
        },
    },
    created(){

        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(resp =>{
            let result = [];
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                let temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            this.commentList = result;
        }).catch(() =>{
            console.log('获取最新评论失败');
        });
    }
});
let keyWord = new Vue({//根据标题关键字筛选
  el:'#search_bar',
    data:{

    },
    computed:{
         search(){
             // location.href = 'index.html?bid=24'
             // 查找出 关键字 文章的 bid  设置 到 href 上 添加 ?bid = ? index.js 里面的getpage 根据 tag bid 不同的值 获取不同的列表

              // 查找完成后 直接设置 index.html?bid = ? 使每个页面都跳回index页面
             return () =>{
                 let key = document.getElementById('oInput').value;
                 axios({
                     method:'get',
                     url:`/queryBlogIdByTitle?keyWord=${key}`
                 }).then(resp =>{
                     let bidArr = [];
                     for(let i = 0; i < resp.data.data.length; i++){
                         bidArr.push(resp.data.data[i].id);
                     }

                     let bidStr = bidArr.join('|');// 把 很多bid转为 字符串

                     location.href = `index.html?bid=${bidStr}`;// 跳转页面
                 }).catch(() =>{
                     console.log('查询文章id失败')
                 })
             }
         }
    },
    created(){

    }
});