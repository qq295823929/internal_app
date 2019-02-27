<template>
    <div class="manager_lists_box">
        <div class="task_base_info">
            <div class="tab">
                <div class="type">
                    <div class="type_item" :class="tabType==true?'active':''" @click="changeTab()">进行中</div>
                    <div class="type_item" :class="tabType==false?'active':''" @click="changeTab()">已完成</div>
                </div>
            </div>
            <div class="data_lists" v-show="tabType==true">
                <div class="doing_lists">
                    <router-link tag="a" :to="{name:'Manager_plan_details',query:{id:item.ID}}" v-for="(item,id) in doingList" :key="id" class="doing_list">
                        <div class="doing_list_title">
                            <span>{{item.TASK_NAME}}</span>
                            <i class="layui-icon layui-icon-right"></i>
                            <span class="list_time">{{item.CREATE_DATE}}</span>
                        </div>
                        <div class="list_info">
                            <div class="percent">
                                <div class="now_percent" :percent="item.TASK_PROGRESS"></div>
                            </div>
                            <div class="percent_text">{{item.TASK_PROGRESS}}%</div>
                        </div>
                        <div class="doing_list_tool">
                            <div class="tool_item">{{item.ROLETYPENAME}}</div>
                            <div class="tool_item">{{item.USER_NAME}}</div>
                            <div class="tool_item">{{item.UPDATE_DATE}}</div>
                        </div>
                    </router-link>
                </div>
                <div class="done_lists"  v-show="tabType==false">
                    <div class="done_list">
                        <div class="doing_list_title">
                            <span>人人通空间</span>
                            <i class="layui-icon layui-icon-right"></i>
                            <span class="list_time">2018-12-12 15:20</span>
                        </div>
                        <div class="done_info">
                            <div class="info_item">测试组:<span>---</span></div>
                            <div class="info_item">测试组:<span>---</span></div>
                            <div class="info_item">测试组:<span>2018-12-12 12:22</span></div>
                            <div class="info_item">测试组:<span>---</span></div>
                        </div>
                        <div class="done_img">
                            <!--<img src="../../images/internal_plan/yz.png" />-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="new"></div>
    </div>

</template>

<script>
    export default {
        name: "Manager_plan_lists",
        data(){
            return {
                doingList:[],
                doneList:[],
                tabType:true
                
            }
        },
        methods:{
            changeTab:function () {
                this.tabType=!this.tabType
            }
        },
        created:function () {


            console.log(this.$store.state);
        },
        mounted:function () {
            var self=this;
            $.ajax({
                url:"/anhao/JYKJTask/selectNotCompleteTaskListOfManager",     //查询未完成列表
                type:"post",
                data:{
                    userId:1
                },
                success:function (res) {
                    var data=res.data;
                    self.doingList.push.apply(self.doingList,data);

                    // doingData=data;
                    // renderDoingList(data)
                }
            })
            // console.log($);
            // let url="http://www.hheducloud.gov.cn/JYKJTask/selectNotCompleteTaskListOfManager";
            // this.axios.post(url,{params:{userId:12}}).then(res=>{
            //     console.log(res);
                // let len = res.data.data.films.length;
                // if(len == 0)return;
                // this.arr = this.arr.concat(res.data.data.films);
                // console.log(this.arr);
                // this.bReady = true;//数据加载完成
                // console.log("数据加载完成",this.bReady);//true
            // });
            // this.axios.post({url:'http://www.hheducloud.gov.cn/JYKJTask/selectNotCompleteTaskListOfManager',params:{userId:1}}).then(function(res){
            //         console.log(res.data)
            //
            // })
        }

    }
</script>

<style scoped>
    .tab{
        text-align: center;
        padding: 0.2rem 0;
    }
    .type{
        border: 1px solid #33a9e9;
        border-radius: 3px;
        display: inline-block;
        width: 4.4rem;
        overflow: hidden;
        font-size: 0.32rem;
    }
    .type>div{
        display: inline-block;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 50%;
        background: #ffffff;
        color: #33a9e9;
        float: left;
    }
    .type>div.active{
        background: #33a9e9;
        color: #ffffff;
    }
    .doing_list{
        width: 7.0rem;
        /*height: 3.2rem;*/
        border: 1px solid #e5e5e5;
        background:  #ffffff;
        margin: 0.2rem auto;
        border-radius: 0.1rem;
        display: block;
    }
    .doing_list_title{
        height: 0.8rem;
        border-bottom: 1px dashed #f1f1f1;
        margin: 0 0.2rem;
        line-height: 0.78rem;
        font-size: 0.3rem;
    }
    .doing_list_title>.list_time{
        float: right;
        font-size: 0.26rem;
        color: #cccccc;
    }
    .doing_list_title>i{
        float: right;
    }

    .list_info{
        width: 100%;
        margin-top: 0.2rem;
        padding: 0.2rem;
        margin-bottom: 0.2rem;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }
    .percent{
        height: 0.3rem;
        border-radius: 0.15rem;
        background: #e0e0e0;
        width: 85%;
        position: relative;
    }
    .now_percent{
        transition: 1s ease-out;
        height: 100%;
        width: 0;
        background: linear-gradient(to right,#009788,#12c8a0);
        border-radius: 0.15rem;
    }
    .percent_text{
        font-size: 0.3rem;
        color: #158d81;
    }

    .doing_list_tool{
        display: flex;
        justify-content: space-between;
        font-size: 0.3rem;
        padding: 0.2rem;
    }






    /*已完成*/

    .done_list{
        width: 7.0rem;
        /*height: 3.2rem;*/
        border: 1px solid #e5e5e5;
        background:  #ffffff;
        margin: 0.2rem auto;
        border-radius: 0.1rem;
        /*padding: 0.2rem 0.2rem;*/
        position: relative;
    }

    .done_info{
        font-size: 0.28rem;
        line-height: 0.5rem;
        padding: 0.2rem;
    }
    .done_info span{
        color: #777777;
    }
    .done_img{
        position: absolute;
        right: 0.4rem;
        top: 1rem;
        height: 1.9rem;
        width: 1.9rem;
        font-size: 0;
    }
    .done_img img{
        height: 100%;
        width: 100%;

    }
</style>