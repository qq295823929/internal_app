<template>
    <div class="task_base_info">

        <div class="tab">
            <div class="type">
                <div class="type_item" :class="tabType==true?'active':''" @click="changeTab()">进行中</div>
                <div class="type_item" :class="tabType==false?'active':''" @click="changeTab()">已完成</div>
            </div>
        </div>


        <div class="data_lists">
            <div class="doing_lists" v-show="tabType==true">
                <div class="doing_list"  v-for="(item,id) in doingList" :key="id" >
                    <div class="doing_list_title">
                        <span>人人通空间</span>
                        <i class="layui-icon layui-icon-right"></i>
                        <span class="list_time">2018-12-12 15:20</span>
                    </div>
                    <div class="list_info">
                        <div class="person">
                            <span>发起人</span>
                            <p>王大锤</p>
                        </div>
                        <div class="time ">
                            <span>任务截止时间</span>
                            <p>2018-12-12 :12:12</p>
                        </div>
                        <div class="list_progress">
                            <canvas id="canvas_1" width="20" height="20"></canvas>
                            <canvas id="canvas_2" width="20" height="20"></canvas>
                        </div>
                    </div>
                    <div class="doing_list_tool">
                        <div class="delay_time"><i class="layui-icon layui-icon-tips"></i>---</div>
                        <div class="list_delay">申请延期</div>
                        <div class="updata_progress">更新进度</div>
                    </div>
                </div>
            </div>
            <div class="done_lists" v-show="tabType==false">
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
</template>

<script>
    export default {
        name: "Plan_lists",
        data(){
            return {
                tabType:true,
                doingList: [],
            }
        },
        methods:{
            changeTab:function () {
                this.tabType=!this.tabType
            }
        },
        mounted:function () {
            var self=this
            $.ajax({
                url:"/anhao/JYKJTask/selectJYKJTaskProgByUserId",     //进行中的任务
                type:"post",
                data:{
                    userId:8,
                },
                success:function (res) {
                    self.doingList=res.data;


                }
            });

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



    .data_lists{

    }
    .doing_list{
        width: 7.0rem;
        height: 3.2rem;
        border: 1px solid #e5e5e5;
        background:  #ffffff;
        margin: 0.2rem auto;
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
        padding: 0.3rem 0;
        overflow: hidden;
        font-size: 0.28rem;
    }
    .list_info>div{
        float: left;
        height: 0.7rem;
    }
    .list_info p{

    }
    .list_info>.person{
        width: 1.3rem;
        text-align: left;
        padding-left: 0.2rem;
    }
    .list_info .person span{

    }
    .list_info .person p{
        color: #aaaaaa;

    }



    .list_info>.time{
        width:3.3rem;
        text-align: left;
        padding: 0 0.2rem;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
    }
    .list_info .time span{
        margin-bottom: 0.2rem;
    }
    .list_info .time p{
        color: #aaaaaa;
    }



    .doing_list_tool{
        border-top: 1px solid #e5e5e5;
        padding: 0.27rem 0;
        height: 1rem;
        font-size: 0.32rem;
    }
    .doing_list_tool>div{
        float: left;
    }

    .delay_time{
        width: 2.5rem;
        font-size: 0.22rem;
        line-height: 0.5rem;
        padding-left: 0.1rem;
    }
    .delay_time i{
        font-size: 0.22rem;
        color: #0a8033;
    }
    .list_delay{
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        width: 2.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        color: red;
        text-align: center;
    }
    .updata_progress{
        width: 2.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        color: blue;
        text-align: center;
    }




    /*已完成*/
    .done_lists{
        display: none;
    }
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
    /*已完成*/





    .list_info>.list_progress{
        position: relative;
        height: 0.8rem;
        width: 0.8rem;
        /*margin-top: 0.05rem;*/
        /*margin-right: 0.05rem;*/
        margin-left: 0.3rem;
    }
    .list_progress>canvas{
        display: block;
        margin: 0;
        position: absolute;
        /*background: white;*/
        /* left: 0.7rem; */
        /* top: 0; */
        left: 0;
        height: 100%;
        width: 100%;
    }
    .canvas1{
        z-index: 1;
    }

    .canvas2{z-index: 2; background: transparent;transform:rotate(-90deg); }














    .task_progress{
        padding: 0.3rem;
    }
    .percent{
        padding: 0.1rem 0;
    }
    .percent span{
        margin-right: 0.99rem;
        font-size: 0.24rem;
    }




    .work_delay{
        width: 100%;
        border-top:1px solid #cccccc;
        padding: 0.3rem 0;
        display: none;
    }
    .delay_lists{
        width: 100%;
    }
    .delay_list{
        width: 100%;
        font-size: 0.28rem;
        color: #747474;
        line-height: 0.45rem;
        padding: 0 0.2rem;
        overflow: hidden;
    }
    .delay_list>div{
        float: left;
        margin-right: 0.1rem;
    }
    .delay_list>span{
        float: left;
        margin-right: 1rem;
        margin-left: 0.1rem;
    }

    .delay_reason_trans,.delay_to{
        font-size: 0.28rem;
        font-weight: 600;
        width: 100%;
    }
    .delay_reason{
        background: #eeeeee;
        line-height: 0.5rem;
        padding: 0.1rem;
        width: 100%;
    }
    .delay_to span{
        float: right;
        color: #cccccc;
    }
    .delay_to{
        border-bottom: 1px solid #dddddd;
    }

    .delay_examine_btn{
        font-size: 0.3rem;
        width: 100%;
        overflow: hidden;
        padding: 0.5rem 0 0.3rem 0.3rem;
        display: none;
    }
    .disagree_delay,.agree_delay{
        width: 3.3rem;
        height: 0.8rem;
        text-align: center;
        float: left;
        border-radius: 5px;
        line-height: 0.8rem;
        transition: all 0.2s linear;
    }

    .disagree_delay{
        border: 1px solid #cccccc;
        background: #ffffff;
        margin-right: 0.3rem;
    }
    .disagree_delay:active{
        background: #f5f5f5;

    }
    .agree_delay{
        background: #169bd4;
        border: none;
        color: #ffffff;
    }
    .agree_delay:active{
        background: #26a5d4;
    }



    .todo_main,.todo_seconde{
        background: #ffffff;
    }
    .todo_main{
        margin: 0.2rem 0;
    }
    .todo_main_title{
        overflow: hidden;
    }
    .todo_main_trans,.todo_seconde_trans{
        font-size: 0.25rem;
        font-weight: 600;
        padding-left: 0.3rem;
        line-height: 0.85rem;
        float: left;
    }
    .clear_todo_main,.clear_todo_seconde{
        float: right;
        font-size: 0.25rem;
        padding-left: 0.3rem;
        line-height: 0.85rem;
        padding-right: 0.3rem;
    }

    .todo_main_lists{
        overflow: hidden;
        padding: 0 0.3rem 0.2rem;
    }
    .todo_seconde_lists{
        overflow: hidden;
        padding: 0 0.3rem 0.2rem;
    }
    .todo_main_list{
        width: 1.7rem;
        height: 1.7rem;
        text-align: center;
        float: left;
    }
    .todo_seconde_list{
        width: 1.7rem;
        height: 1.7rem;
        text-align: center;
        float: left;
    }

    .todo_main_list .todo_main_img{
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
    }
    .todo_seconde_list .todo_seconde_img{
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
    }
    .todo_main_img img{
        width: 100%;
        height: 100%;
        float: left;
    }
    .todo_seconde_img img{
        width: 100%;
        height: 100%;
        float: left;
    }
    .todo_main_list span{
        display: inline-block;
        width: 100%;
        text-align:center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.22rem;
        line-height: 0.5rem;
    }
    .todo_seconde_list span{
        display: inline-block;
        width: 100%;
        text-align:center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.22rem;
        line-height: 0.5rem;
    }

    .todo_seconde_title{
        overflow: hidden;
    }



    .details_btn{
        margin-top: 0.8rem;
        overflow: hidden;
        padding-bottom: 0.8rem;
        padding-left: 0.3rem;


    }
    .apply_delay_btn,.submit_progress_btn{
        width: 3.2rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.32rem;
        border: 1px solid #cccccc;
        border-radius: 5px;
        background: #ffffff;
        float: left;
    }
    .apply_delay_btn{
        margin-right: 0.3rem;
    }
    .apply_delay_btn:active,.submit_progress_btn:active{
        background: #f5f5f5;
    }

    .apply_delay_box,.submit_progress_box{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        display: none;
        z-index: 4;
    }

    .delay_info{

    }
    .delay_info ul{

    }
    .delay_info ul li {
        line-height: 0.9rem;
        font-size: 0.34rem;
    }
    .delay_info ul li span{
        color: #bbbbbb;
    }
    .delay_info ul li p{
        float: right;
    }




    .apply_delay,.submit_progress{
        background: #ffffff;
        border-radius: 5px;
        margin-top: 2rem;
        width: 100%;
        padding: 0.2rem;
    }
    .apply_delay_title,.submit_progress_title{
        font-size: 0.3rem;
        font-weight: 600;
        line-height: 0.5rem;
    }
    .submit_progress_title span{
        float: right;
        color: #969696;
        font-size: 0.24rem;
    }
    .apply_delay_text{
        width: 100%;
    }
    #apply_delay_text{
        width: 100%;
        outline: none;
        border: 1px solid #cccccc;
        border-radius: 5px;
        height: 2.2rem;
        font-size: 0.3rem;
        line-height: 0.5rem;
        padding: 0.1rem;
    }

    .apply_delay_time{
        width: 100%;
        line-height: 0.9rem;
        overflow: hidden;
        border-bottom: 1px solid #cccccc;
        margin-bottom: 1.35rem;
    }
    .apply_delay_time_trans{
        font-size: 0.3rem;
        font-weight: 600;
        float: left;
    }
    #apply_delay_time{
        /*font-size: 0.28rem;*/
        color: #aaaaaa;
        margin-left: 2rem;
        float: left;
        width: 4rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.28rem;
        text-align: center;
        border: none;
    }
    .progress_status{
        margin: 2rem 0;

    }
    .delay_btn,.progress_btn{
        overflow: hidden;
    }
    .cancel_delay,.sure_delay,.cancel_progress,.sure_progress{
        width: 3.2rem;
        border: 1px solid #cccccc;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.3rem;
        border-radius: 3px;
        float: left;
    }
    .cancel_delay,.cancel_progress{
        background: #ffffff;
        margin-right: 0.3rem;
    }
    .sure_delay,.sure_progress{
        background: #169bd4;
        color: #ffffff;
    }
    .cancel_delay:active,.cancel_progress:active{
        background: #f5f5f5;
    }
    .sure_delay:active,.sure_progress:active{
        background: #19a3d4;
    }

    .revoke_btn {
        width: 100%;
        /*background: #ffffff;*/
        display: none;
        padding: 0.5rem;
    }
    .revoke{
        text-align: center;
        font-size: 0.3rem;
        line-height: 0.8rem;
        background: #ffffff;
        width: 100%;
        border: 1px solid #aaaaaa;
        border-radius: 5px;
    }
    .revoke:active{
        background: #f5f5f5;
    }
</style>