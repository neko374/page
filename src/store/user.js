export const user = {
    state: {
        //用户信息
        userInfo: "",
        //
        armyid:""
    },
    mutations: {
        //设置用户信息
        setUserInfo(state, val) {
            state.userInfo = val;
        },
        //用户id
        setArmyid(state, val) {
            state.armyid = val;
        }
    },
    actions: {
        //异步设置用户信息
        setUserInoAction(context, val) {
            context.commit("setUserInfo", val)
        },
         //异步设置用户id
         setArmyidAction(context, val) {
            context.commit("setArmyid", val)
        },
    },
    getters: {}
}