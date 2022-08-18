
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
        store.tabLists.forEach(item => {
            item.flag = true
        })
        store.list = [...store.tabLists, ...store.list];
        store.tabLists = []
    },
    // 删除全部
    delAl(store) {
        store.tabLists.forEach(item => {
            item.flag = false
        })
        store.delList = [...state.delList, ...store.list];
        store.list = []
    },
    // 清空回收站
    delLast(store) {
        store.delList = []
    },
    // 还原未读
    restoreDo(store, obj) {
        store.tabLists.push(obj.val)
        store.delList.splice(obj.i, 1)
    },
    // 标为已读
    changeFl(store, obj) {
        store.list.push(obj.val)
        obj.val.flag = true
        store.tabLists.splice(obj.i, 1)
    },
    // 还原未读
    restor(store, val) {
        console.log(val);
        store.tabLists.push(val)
        val.flag = false
        store.list = store.list.filter(item => item.flag)
    },
    // 单个删除
    delOne(store, val) {
        const cItem = store.delList.find(item => item.title == val.title)
        if (cItem) return alert('已删除')
        store.delList.push(val)
        val.flag = false
        store.list = store.list.filter(item => item.flag)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
}