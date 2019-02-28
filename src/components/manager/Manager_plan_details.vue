<template>
    <div class="task_base_info">
        <!--<i-button type="dashed" ghost>Dashed</i-button>-->
        <!--<div style="height: 1rem;width: 1rem">-->
        <!--<Circle :percent="80" size="50rem">-->
        <!--<span class="demo-Circle-inner" style="font-size:25px">80%</span>-->
        <!--</Circle>-->
        <!--</div>-->
        <!--<Circle :percent="10" stroke-color="#5cb85c">-->
        <!--<Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>-->
        <!--</Circle>-->
        <!--<Circle :percent="35" stroke-color="#ff5500">-->
        <!--<span class="demo-Circle-inner">-->
        <!--<Icon type="ios-close" size="50" style="color:#ff5500"></Icon>-->
        <!--</span>-->
        <!--</Circle>-->

        <!--<i-slider ></i-slider>-->

        <div class="manager_plan_details">
            <div class="info_item" v-if="(detailsList[0]&&detailsList[0].TASK_PROG_DETAILS==100)">
                <!--<i class="layui-icon layui-icon-circle"></i>-->
                <div class="info_time">
                    <!--<span>{{detailsList[0].TASK_PROG_DETAILS}}</span>-->
                </div>
                <div class="info_btn">
                    <div class="info_send_btn" @click="sendTask()">任务下发</div>
                </div>
            </div>
            <div class="item" v-for="(item,id) in detailsList" :key="id">
                <div v-if="item.MOLD=='延期申请'" class="info_item">
                    <i class="layui-icon layui-icon-circle"></i>
                    <div class="info_time">
                        <span>09-04 18:02</span>
                    </div>
                    <div class="info_detail">
                        <div class="info_con">
                            <div class="info_tips main_do">
                                <span>{{item.USER_NAME}}:</span>{{item.MOLD}}
                            </div>
                            <div class="info_tips">
                                <span>延期至:</span>09-15 12:00
                            </div>
                        </div>
                        <div class="info_tool">
                            <div class="approve" v-if="item.STATUS==0&&item.STATUS_TEXT!='未操作'" @click="approve(item)">操作</div>
                            <div v-if="(!(item.STATUS==0&&item.STATUS_TEXT!='未操作'))" :class="(item.STATUS==1?'status1':'status2')">
                                {{item.STATUS_TEXT}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info_item" v-if="item.MOLD=='任务下达'">
                    <i class="layui-icon layui-icon-circle"></i>
                    <div class="info_time">
                        <span>{{item.CREATE_DATE}}</span>
                    </div>
                    <div class="info_detail">
                        <div class="info_con">
                            <div class="info_tips main_do">
                                <span>任务下达:</span>{{item.ROLETYPENAME}}
                            </div>
                            <div class="info_tips">
                                <span>完成时间:</span>{{item.REQU_COMPLETE_DATE}}
                            </div>
                            <div class="info_tips">
                                <span>所属项目:</span>{{item.PROJECT_NAME}}
                            </div>
                            <div class="info_tips">
                                <span>负责人:</span>{{item.USER_NAME}}
                            </div>
                        </div>
                        <div class="info_tool">
                            <!--<div class="approve">操作</div>-->
                        </div>
                    </div>
                </div>


                <div class="info_item status" v-if="item.MOLD=='进度更新'">
                    <i class="layui-icon layui-icon-circle"></i>
                    <div class="info_time">
                        <span>{{item.CREATE_DATE}}</span>
                    </div>
                    <div class="info_detail">
                        <div class="info_con">
                            <div class="info_tips main_do">
                                <span>{{item.USER_NAME}}:</span>更新进度
                            </div>
                        </div>
                        <div class="info_status">
                            <Circle :percent="parseInt(item.TASK_PROG_DETAILS||0)" :size="30">
                                <span class="demo-Circle-inner"
                                      style="font-size:12px">{{item.TASK_PROG_DETAILS}}%</span>
                            </Circle>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="new_form layui-form" v-show="sendShowFlag">
            <div class="form_item">
                <div class="form_title">任务名称</div>
                <div class="form_con">
                    <input type="text" :value="planInfo.TASK_NAME" placeholder="请填写任务名称" id="plan_name" readonly>
                </div>
            </div>
            <div class="form_item">
                <div class="form_title">项目组</div>
                <div class="form_con">
                    <input type="text" :value="roleTypeText" id="form_pename" readonly>
                    <i></i>
                </div>
            </div>
            <div class="form_item">
                <div class="form_title">负责人</div>
                <div class="form_con">
                    <i-select v-model="sendInfo.planPerson" style="width:200px" :change="change()">
                        <i-option v-for="(item,id) in personList" :value="item.ID" :key="id">{{item.USER_NAME}}
                        </i-option>
                    </i-select>
                </div>
            </div>
            <div class="form_item">
                <div class="form_title">截止时间</div>
                <Row>
                    <Col span="12">
                        <DatePicker type="datetime" :options="sendInfo.requestTime"
                                    format="yyyy-MM-dd HH:mm" placeholder="Select date"
                                    style="width: 200px" v-model="sendInfo.request"
                                    @on-change="changeDateTime(datetime)"></DatePicker>
                    </Col>
                </Row>
            </div>

            <div class="send_btn">
                <div class="cancle_send" @click="changeSendFlag()">取消</div>
                <div id="send_btn" @click="sendNewTask()">任务下达</div>
            </div>
        </div>


        <div class="apply_delay_box" v-show="applyShowFlag">
            <div class="apply_delay">
                <div class="delay_info">
                    <span>延期原因</span>
                    <p id="reason">{{delay.requestReason}}</p>
                    <ul>
                        <li><span>申请人</span>
                            <p id="delay_name">{{delay.delayInfo.USER_NAME}}</p></li>
                        <li><span>项目组</span>
                            <p id="delay_pename">{{delay.delayInfo.ROLETYPENAME}}</p></li>
                        <li><span>延期至</span>
                            <p id="delay_time">{{delay.delayInfo.REQU_COMPLETE_DATE}}</p></li>
                    </ul>
                </div>
                <div class="apply_delay_title" v-show="delay.reject==true">申请延期事由</div>
                <div class="apply_delay_text" v-show="delay.reject==true">
                    <textarea id="apply_delay_text" v-model="delay.rejectReason"></textarea>
                </div>
                <div class="delay_btn">
                    <div class="close_btn" v-show="delay.reject==true">取消
                    </div>
                    <div class="reject_btn" v-show="delay.reject==true" @click="checkDelay(0)">确定</div>
                    <div class="cancel_delay" v-show="delay.reject==false">
                        拒绝
                    </div>
                    <div class="sure_delay" v-show="delay.reject==false" @click="checkDelay(1)">同意</div>
                </div>
                <!--<div class="close_apply_box">关闭</div>-->
            </div>
        </div>


        <div class="info_box">
            <div class="on_off" @click="showInfoBox()">
                ======
            </div>
            <div class="doing_list"  ref="doingList">
                <div class="doing_list_title">
                    <span id="task_name">{{planInfo.TASK_NAME}}</span>
                    <i class="layui-icon layui-icon-right"></i>
                    <span id="public_time" class="list_time">{{planInfo.CREATE_DATE}}</span>
                </div>
                <div class="list_info">
                    <div class="percent">
                        <div class="now_percent" :percent="planInfo.TASK_PROGRESS"></div>
                    </div>
                    <div class="percent_text">{{planInfo.TASK_PROGRESS}}%</div>
                </div>
                <div class="doing_list_tool">
                    <div class="tool_item"><span id="pename">{{planInfo.ROLETYPENAME}}</span></div>
                    <div class="tool_item"><span id="user_name">{{planInfo.USER_NAME}}</span></div>
                    <div class="tool_item"><span id="updata_time">{{planInfo.UPDATE_DATE}}</span></div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    import setting from "../../setting";
    export default {
        name: "Manager_plan_details",
        data: function () {
            return {
                detailsList: [],      //详情的列表
                roleType: '',    //当前完成到了第几组
                roleTypeText: '',//当前组的名称
                approveData: {           //审核的详情
                    planPerson: "",
                },
                planInfo: {},            //下方的详情
                // approveBoxShow: false,  //审核的弹出的显示与否;
                sendShowFlag: false,//任务下发platid=e238a843-254e-47be-b977-6f6a26581558&的弹出显示与否;
                personList: [],
                sendInfo: {
                    planPerson: '',
                    request: '',
                    requestTime: {
                        disabledDate(date) {
                            // console.log(new Date(self.nowItem.REQU_COMPLETE_DATE).getTime());
                            // console.log(new Date(self.nowItem.REQU_COMPLETE_DATE).getTime());
                            return date < new Date().getTime();
                        }
                    },

                },//任务下发的信息;
                applyShowFlag: false,

                delay: {         //延期的东西
                    delayInfo: {},
                    reject: false,   //现在是要点拒绝还是点同意
                    requestReason: "",   //请求延期的原因
                    rejectReason: "",     //拒绝申请的原因
                    delayId: "",         //需要延期的这一条数据
                },
                infoBoxFlag:false,

            }
        },
        methods: {
            changeSendFlag:function(){
                this.sendShowFlag=false
            },
            showInfoBox:function (){
                if(this.infoBoxFlag==false){
                    this.$refs.doingList.style.height=3.2+"rem"
                }else {
                    this.$refs.doingList.style.height=0
                }
                this.infoBoxFlag=!this.infoBoxFlag
            },
            checkDelay: function (type) {
                var self=this;
                let obj = {};
                obj.id = this.delay.delayId;
                obj.auditUserId = this.$store.state.userInfo.USER_ID;
                obj.requCompleteDate = this.delay.delayInfo.REQU_COMPLETE_DATE

                this.$Message.destroy()
                if (type == 0) {    //拒绝

                    if(!this.delay.rejectReason){
                        this.$Message.info({
                            content: '请填写您的拒绝意见哦',
                            duration: 10
                        });
                        return false
                    }
                    obj.status = 0
                    obj.auditRemark=this.delay.rejectReason

                } else {     //同意
                    obj.status = 1

                }

                $.ajax({
                    url:setting.url+"/JYKJTask/updateJYKJTaskDelayById",
                    type:"post",
                    data:obj,
                    success:function (res) {
                        if(res.state==1){
                            self.$Message.success('提交审核成功');
                            self.getTaskDeTails()
                        }
                    }
                })








            },


            changeDateTime: function (datetime) {
                console.log(datetime);
                this.sendInfo.request = datetime;
            },
            getTaskDeTails: function () {          //获取这个任务的所有信息
                var self = this;
                $.ajax({
                    url: setting.url+"/JYKJTask/selectJYKJTaskDetails",     //查询任务详细流程
                    type: "post",
                    data: {
                        taskId: self.$route.query.id
                    },
                    success: function (res) {
                        var data = res.data;
                        self.roleType = data[0].ROLE_TYPE + 1;
                        // alert(self.roleType)
                        if (self.roleType == 2) {
                            self.roleTypeText = "前端组"
                        } else if (self.roleType == 3) {
                            self.roleTypeText = "后端组"
                        } else if (self.roleType == 4) {
                            self.roleTypeText = "测试"
                        }
                        self.detailsList.push.apply(self.detailsList, data);
                        console.log(self.detailsList);
                    }
                }).then(function () {
                    $.ajax({                //负责人
                        url: setting.url+"/JYKJTask/selectDevUser",
                        type: "post",
                        data: {
                            roleType: self.roleType
                        },
                        success: function (res) {
                            console.log(res);
                            self.personList = res.data
                        }
                    });
                });
                $.ajax({            //查询下方栏的详情
                    url: setting.url+"/JYKJTask/selectNotCompleteTaskListOfManager",     //查询未完成列表
                    type: "post",
                    data: {
                        userId: self.$store.state.userInfo.USER_ID,
                        taskId: self.$route.query.id
                    },
                    success: function (res) {

                        var data = res.data[0];
                        console.log(data);
                        self.planInfo = data;
                    }
                })
            },

            change: function () {

            },
            approve: function (item) {
                var self = this;
                this.applyShowFlag = !this.applyShowFlag;
                self.delay.delayId = item.ID;
                $.ajax({
                    url: setting.url+"/JYKJTask/selectJYKJTaskDelayDetailsById",
                    type: "post",
                    data: {
                        id: item.ID
                    },
                    success: function (res) {
                        // $(".apply_delay_box").show();
                        console.log(res);
                        var data = res.data;
                        self.delay.delayInfo = data;
                        self.delay.requestReason = data.REMARK
                        // $("#delay_pename").text(data.ROLETYPENAME);//申请的项目组
                        // $("#delay_time").text(data.REQU_COMPLETE_DATE);//申请延期至的时间
                        // $("#reason").text(data.REMARK);//申请延期的原因
                    }
                })


            },
            sendTask() { //点击下达新的任务的按钮,让弹层显示
                this.sendShowFlag = true;
            },
            sendNewTask() {      //点击发送新任务的按钮,发送新任务


                var self = this;

                // alert(self.sendInfo.request);
                // return false
                $.ajax({
                    url: setting.url+"/JYKJTask/addJYKJTask",
                    type: "post",
                    data: {
                        taskName: self.planInfo.TASK_NAME,
                        taskProgress: self.roleType,
                        userId: self.$store.state.userInfo.USER_ID,
                        requCompleteDate: self.sendInfo.request,
                        userId1: self.sendInfo.planPerson,
                        id: self.$route.query.id
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.state == 1) {
                            alert("审核成功")
                            // window.history.go(-1)
                            self.getTaskDeTails();
                        }else{
                            alert("审核失败")
                        }
                    }
                })
                self.sendShowFlag = false;
            }
        },
        mounted: function () {
            this.getTaskDeTails();


        }
    }
</script>

<style scoped>

    .task_base_info {
        padding-bottom: 2rem;
        height: 100%;
    }

    .info_item {
        padding: 0.2rem;
        display: flex;
        align-items: flex-start;
        position: relative;
    }

    .info_time {
        font-size: 0.24rem;
        line-height: 0.4rem;
        color: #747474;
        padding: 0.1rem;
        margin-right: 0.7rem;
        position: relative;
        height: 0.7rem;
        width: 1.7rem;
    }

    /*.info_item:after {*/
    /*content: '';*/
    /*position: absolute;*/
    /*!* top: 0; *!*/
    /*z-index: 0;*/
    /*width: 1px;*/
    /*height: 100%;*/
    /*background: #cccccc;*/
    /*left: 2rem;*/
    /*top: 0.5rem;*/
    /*}*/

    .task_base_info .info_item:last-child:after {
        display: none;
    }

    .info_detail {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0.2rem 0.2rem 0.3rem;
        position: relative;
        border: 1px solid #e5e5e5;
        border-radius: 0.05rem;
        background: #ffffff;
        flex-grow: 1;
    }

    .info_item i {
        position: absolute;
        left: 1.85rem;
        top: 0.35rem;
        background-color: #ffffff;
        display: block;
        z-index: 10;
        border-radius: 50%;
    }

    .info_tips.main_do {
        font-size: 0.34rem;
    }

    .status1 {
        color: #0a8033;
        font-size: 0.35rem;
        line-height: 0.4rem;
    }

    .status2 {
        color: #be6d6d;
        font-size: 0.35rem;
        line-height: 0.4rem;
    }

    .info_tips {
        line-height: 0.5rem;
        font-size: 0.3rem;
    }

    .info_con span {
        color: #747474;
    }

    .approve {
        font-size: 0.35rem;
        color: #0094ff;
        line-height: 0.4rem;
    }

    .status .info_detail {
        padding: 0;
    }

    .status .info_tips.main_do {
        line-height: 0.9rem;
        padding-left: 0.2rem;
    }

    .info_btn {

    }

    .info_send_btn, .info_finish_btn {
        height: 0.7rem;
        width: 2.5rem;
        font-size: 0.4rem;
        text-align: center;
        line-height: 0.7rem;
        border: 1px solid #178d7f;
        border-radius: 0.35rem;
        color: #178d7f;
        background: #ffffff;
    }

    .info_status {
        position: relative;
        height: 0.8rem;
        width: 0.8rem;
        margin-top: 0.05rem;
        margin-right: 0.05rem;
    }

    .info_status > canvas {
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

    .canvas1 {
        z-index: 1;
    }

    .canvas2 {
        z-index: 2;
        background: transparent;
        transform: rotate(-90deg);
    }

    /*延期申请弹出*/

    .apply_delay_box, .submit_progress_box {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        /*display: none;*/
        z-index: 200;
    }

    .delay_info {

    }

    .delay_info > span {
        color: #bbbbbb;
        line-height: 0.9rem;
        font-size: 0.34rem;
    }

    .delay_info > p {
        /*line-height: 0.9rem;*/
        font-size: 0.34rem;
        border-bottom: 1px solid #e5e5e5;
        padding: 0.2rem 0;
    }

    .delay_info ul {

    }

    .delay_info ul li {
        line-height: 0.9rem;
        font-size: 0.34rem;
    }

    .delay_info ul li span {
        color: #bbbbbb;
    }

    .delay_info ul li p {
        float: right;
    }

    .apply_delay, .submit_progress {
        background: #ffffff;
        border-radius: 5px;
        margin-top: 2rem;
        width: 100%;
        padding: 0.2rem;
    }

    .apply_delay_title, .submit_progress_title {
        font-size: 0.3rem;
        font-weight: 600;
        line-height: 0.5rem;
        /*display: none;*/

    }

    .submit_progress_title span {
        float: right;
        color: #969696;
        font-size: 0.24rem;
    }

    .apply_delay_text {
        width: 100%;
        /*display: none;*/
    }

    #apply_delay_text {
        width: 100%;
        outline: none;
        border: 1px solid #cccccc;
        border-radius: 5px;
        height: 2.2rem;
        font-size: 0.3rem;
        line-height: 0.5rem;
        padding: 0.1rem;
    }

    .apply_delay_time {
        width: 100%;
        line-height: 0.9rem;
        overflow: hidden;
        border-bottom: 1px solid #cccccc;
        margin-bottom: 1.35rem;
    }

    .apply_delay_time_trans {
        font-size: 0.3rem;
        font-weight: 600;
        float: left;
    }

    #apply_delay_time {
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

    .cancel_delay, .sure_delay, .close_btn, .reject_btn {
        width: 3.2rem;
        border: 1px solid #cccccc;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.3rem;
        border-radius: 3px;
        float: left;
    }

    .close_btn, .reject_btn {
        /*display: none;*/
    }

    .delay_btn {
        overflow: hidden;
        display: flex;
    }

    .sure_delay, .reject_btn {
        background: #169bd4;
        color: #ffffff;
        margin-left: 0.65rem;
    }

    .cancel_delay:active, .close_btn:active {
        background: #f5f5f5;
    }

    .sure_delay:active, .reject_btn:active {
        background: #19a3d4;
    }

    /*底部信息栏*/
    .info_box {
        background: #ffffff;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 156;
    }

    .info_box.active {

    }

    .on_off {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        color: #555555;
    }

    .doing_list {
        width: 100%;
        /*height: 3.2rem;*/
        /*border: 1px solid #e5e5e5;*/
        background: #ffffff;
        /*margin: 0.2rem auto;*/
        /*border-radius: 0.1rem;*/
        border-top: 1px solid #e5e5e5;
        /*display: none;*/
        overflow: hidden;
        transition: all 0.2s ease;
        height: 0;
    }

    .doing_list_title {
        height: 0.8rem;
        border-bottom: 1px dashed #f1f1f1;
        margin: 0 0.2rem;
        line-height: 0.78rem;
        font-size: 0.3rem;
    }

    .doing_list_title > .list_time {
        float: right;
        font-size: 0.26rem;
        color: #cccccc;
    }

    .doing_list_title > i {
        float: right;
    }

    .list_info {
        width: 100%;
        margin-top: 0.2rem;
        padding: 0.2rem;
        margin-bottom: 0.2rem;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }

    .percent {
        height: 0.3rem;
        border-radius: 0.15rem;
        background: #e0e0e0;
        width: 85%;
        position: relative;
    }

    .now_percent {
        transition: 1s ease-out;
        height: 100%;
        width: 0;
        background: linear-gradient(to right, #009788, #12c8a0);
        border-radius: 0.15rem;
    }

    .percent_text {
        font-size: 0.3rem;
        color: #158d81;
    }

    .doing_list_tool {
        display: flex;
        justify-content: space-between;
        font-size: 0.3rem;
        padding: 0.2rem;
    }

    /*下达任务的表格*/
    .new_form {
        background: #ffffff;
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 50;
        /*display: none;*/
    }

    .form_item {
        padding: 0.2rem 0.6rem;
        font-size: 0.3rem;
    }

    .form_title {
        font-size: 0.24rem;
        color: #cccccc;
        line-height: 0.5rem;
    }

    .form_con {
        position: relative;
    }

    .form_con input {
        border: 1px solid #ffffff;
        border-bottom-color: #0a8033;
        padding: 0.1rem 0;
        height: 0.7rem;
        line-height: 0.7rem;
        background: none;
        width: 100%;
        font-size: 0.3rem;
    }

    .form_con i {
        position: absolute;
        right: 0;
        line-height: 0.7rem;
        font-size: 0.3rem;
        top: 0;
    }

    .send_btn {
        margin: 1rem auto;
        text-align: center;
        font-size: 0.3rem;
        display: flex;
        justify-content: space-between;
    }

    .cancle_send {
        width: 40%;
        /*color: #ffffff;*/
        /*background: #169bd4;*/
        line-height: 0.8rem;
        height: 0.8rem;
        text-align: center;
        margin: 0 auto;
        border-radius: 0.1rem;
        transition: all 0.1s ease;
        border: 1px solid #e5e5e5;
    }

    #send_btn {
        width: 40%;
        color: #ffffff;
        background: #169bd4;
        line-height: 0.8rem;
        height: 0.8rem;
        text-align: center;
        margin: 0 auto;
        border-radius: 0.1rem;
        transition: all 0.1s ease;
    }

    #send_btn:active {
        opacity: 0.85;
    }


</style>