<template>
    <div class="login">
        <div class="input">
            <label>请输入openid</label><Input v-model="openid" placeholder="请输入您的openid" style="width: 300px" />
        </div>
        <div class="submit">
            <Button type="success" long @click="login()">提交</Button>
        </div>
    </div>
</template>

<script>
    import setting from "../setting";

    export default {
        name: "login",
        data:function () {
            return {
                openid:''   //微信openid
            }
        },
        methods:{
            login:function () {
                var self=this;
                $.ajax({
                    url: setting.url+"/JYKJTask/selectJYKJUserInfoByOpenId",
                    type: "post",
                    data: {
                        wxOpenId: self.openid
                    },
                    success: function (res) {
                        if(res.state==1){
                            self.$store.dispatch("getUerInfo",res.data);
                            window.localStorage.setItem('internal',JSON.stringify(res.data));
                            if(res.data.IS_MANAGER==1){ //是管理员
                                self.$router.push({name:'Manager_plan_lists',});
                            }else{          //是负责人
                                self.$router.push({name:'Plan_lists',});
                            }
                        }
                    }
                });
            }
        },
        created:function () {
            console.log(setting);
        },
        mounted:function () {

        }
    }
</script>

<style scoped>
    .input{
        margin: 1rem 0;
        display: flex;
        justify-content: center;
    }
    .input label{
        display: flex;
        align-items: center;
        margin-right: 0.2rem;
    }
    .submit{
        margin: 1rem 0.5rem;
    }
</style>