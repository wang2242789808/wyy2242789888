
const state = {
    tabLists: [],
    list: [],
    delList: [],
    currentPage: 1,
    pageSize: 5,
}

const mutations = {
    changeName(store) {
        store.user = "333"
    },
    // 全部标为已读
    changeDo(store) {
        // store.tabLists.forEach(item => {
        //     item.flag = true
        // })     
        publicArr(store.tabLists, true)
        store.list = [...store.tabLists, ...store.list];
        store.tabLists = []
    },
    // 删除全部
    delAl(store) {
        // store.tabLists.forEach(item => {
        //     item.flag = false
        // })
        publicArr(store.tabLists, false)
        store.delList = [...state.delList, ...store.list];
        store.list = []
    },
    // 清空回收站
    delLast(store) {
        store.delList = []
    },
    // 还原未读
    restoreDo(store, obj) {
        // store.tabLists.push(obj.val)
        // store.delList.splice(obj.i, 1)
        publicSplice(store.tabLists, store.delList, obj)
    },
    // 标为已读
    changeFl(store, obj) {
        obj.val.flag = true
        // store.list.push(obj.val)
        // store.tabLists.splice(obj.i, 1)
        publicSplice(store.list, store.tabLists, obj)
    },
    // 还原未读
    restor(store, val) {
        console.log(val);
        // store.tabLists.push(val)
        // val.flag = false
        // store.list = store.list.filter(item => item.flag)
        publicStore(store.tabLists, val, store.list)
    },
    // 单个删除
    delOne(store, val) {
        const cItem = store.delList.find(item => item.title == val.title)
        if (cItem) return alert('已删除')
        // store.delList.push(val)
        // val.flag = false
        // store.list = store.list.filter(item => item.flag)
        publicStore(store.delList, val, store.list)
    },


}
// 公共方法抽离
function publicStore(arr, val, list) {
    arr.push(val)
    val.flag = false
    list = list.filter(item => item.flag)
}
// 还原未读 单个删除
function publicSplice(arr, list, obj) {
    arr.push(obj.val)
    list.splice(obj.i, 1)
}
// 全部标为已读 删除全部 
function publicArr(arr,status) {
    arr.forEach(item => {
        item.flag = status
    })
    // list = [...arr, ...list];
    // arr = []
}
export default {
    namespaced: true,
    state,
    mutations,
}