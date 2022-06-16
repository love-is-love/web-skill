<template>
    <el-row>
        <el-col :span="6">
            <Aside />
        </el-col>
        <el-col :span="18">
            <router-view />
        </el-col>
    </el-row>
</template>
<script>
import Aside from "./Aside.vue"
export default {
    name:"",
    components:{
        Aside
    }
}
</script>