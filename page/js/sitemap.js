let blogList = new Vue({
    el:'#blog_list',
    data:{
        blogList:[],
    },
    computed:{

    },
    created(){
        //获取全部文章
        axios({
            method:'get',
            url:'/queryAllBlog'
        }).then(resp =>{
            console.log(resp);
            // resp.data.data.forEach(function(ele) {
            //     ele.data.data.link = `/blog_detail.html?bod=${ele.id}`;
            // });
            for(let i = 0; i <resp.data.data.length; i++){
                resp.data.data[i].link = `/blog_detail.html?bid=${resp.data.data[i].id}`;
            }
            this.blogList = resp.data.data;
        }).catch(resp =>{
            console.log('获取全部文章失败')
        });
    }

})