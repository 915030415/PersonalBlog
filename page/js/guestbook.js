//发送留言
let sendComment = new Vue({
    el:'#send_comment',
    data: {
        vcode:'',
        rightCode:'',
    },
    computed:{
        changeCode(){//发送验证码接口
            return ()=>{
                axios({
                    url:'/queryRandomCode',
                    method:'get',
                }).then(resp =>{
                    console.log(resp);
                    this.vcode = resp.data.data.data;
                    this.rightCode = resp.data.data.text;
                }).catch(resp =>{
                    console.log('获取验证码错误');
                });
            }
        },
        sendComment() {
            return () =>{
                let code = document.getElementById('comment_code').value;
                console.log(code,this.rightCode);
                if(code != this.rightCode){
                    alert('验证码有误');
                    document.getElementById('comment_code').value = '';
                    this.changeCode()// 更新验证码
                    return
                }

                let bid = -2;//文章id   文章 id -1 为 关于 页面  为 -2 为 留言 页面

                //    发送ajax 请求 保存 评论
                let reply = document.getElementById('comment_reply').value;
                let name = document.getElementById('comment_name').value;
                let email = document.getElementById("comment_email").value;
                let content = document.getElementById("comment_content").value;
                let replyName = document.getElementById('comment_reply_name').value;
                // parent 为 -1 就是 不是 评论别人
                axios({
                    url:`/addComment?bid=${bid}&parent=${reply}&userName=${name}&email=${email}&content=${content}&parentName=${replyName}`,
                    method:'get',
                }).then(resp => {
                    // console.log(resp);
                    console.log(33333333)
                    alert('评论成功');

                    document.getElementById('comment_name').value = '';//清空
                    document.getElementById("comment_email").value = '';
                    document.getElementById("comment_content").value = '';
                    document.getElementById('comment_code').value = '';

                }).catch(resp =>{
                    console.log('保存评论错误')
                });
            }
        }
    },
    created() {
        this.changeCode();
    }
});

//获取留言
let blogComments = new Vue({
    el:'#blog_comments',
    data:{
        total:0,
        comments:[
            // {id:'1',user_name:'panda',ctime:'1232131',comments:'asdfasd',options:''},
            // {id:'1',user_name:'panda',ctime:'1232131',comments:'asdfasd',options:''},
            // {id:'1',user_name:'panda',ctime:'1232131',comments:'asdfasd',options:''},
            // {id:'1',user_name:'panda',ctime:'1232131',comments:'asdfasd',options:''}
        ]
    },
    computed:{
        getTime(){
            return (time) =>{
                let now = new Date(time*1000);////数据库里存着的是毫秒
                return now.getFullYear() + '年' + now.getMonth() + '月' + now.getDay() + '日';
            }
        },
        queryCommets() {
            //拿到 文章id

            var bid = -2;// 关于页面 文章id -1
            //
            // for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
            //     if (searcheUrlParams[i].split("=")[0] == "bid") {
            //         try {
            //             bid = parseInt(searcheUrlParams[i].split("=")[1]);
            //         }catch (e) {
            //             console.log(e);
            //         }
            //     }
            // }
            //    根据文章的id 拿到留言
            axios({
                url:`/queryCommentsByBlogId?bid=${bid}`,
                method:'get'
            }).then(resp =>{
                this.comments = resp.data.data;
                //过滤 数据  如果 是 回复别人的则 options 加上 内容
                this.comments.forEach(ele=>{
                    if(ele.parent > -1){
                        ele.options = "回复@" + ele.parent_name;
                    }
                });
                console.log(resp);
            }).catch(resp =>{
                console.log('请求留言错误')
            });

            axios({
                method: "get",
                url: "/queryCommentsCountByBlogId?bid=" + bid
            }).then(function (resp) {
                blogComments.total = resp.data.data[0].count;
            }).catch(function(resp) {
                console.log("请求错误");
            });
        },
        reply(){
            return (commentId,userName) =>{
                document.getElementById("comment_reply").value = commentId;//设置 回复的id // 是 -1 则不是 回复 别人 这个值 是parent
                document.getElementById("comment_reply_name").value = userName;// 设置回复谁的评论
                location.href = "#send_comment";// 页面 跳到 评论的地方

            }
        }
    },
    created(){
        this.queryCommets;// 获取 留言
    }
});