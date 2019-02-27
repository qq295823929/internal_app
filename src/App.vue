<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import setting from "./setting.js"
    export default {
        name: 'App',
        data:function () {
            return {

            }
        },
        beforeCreate:function(){
            // console.log(setting);







            let userInfo=window.localStorage.getItem("internal");
            // alert(userInfo);
            var win=window

            console.log(this.$store.state.userInfo);


            win.addEventListener("beforeunload", () => {
                localStorage.setItem("internal", JSON.stringify(this.$store.state.userInfo))
            })



            if(userInfo){
                // self.$router.push({name:'Plan_lists',});

                this.$store.dispatch("getUerInfo",JSON.parse(userInfo));


            }else{
                this.$router.push({name:'Login',});
            }
        },
        created:function () {

        },
        mounted:function () {

        }
    }
</script>

<style>
    #app {
    }
</style>
