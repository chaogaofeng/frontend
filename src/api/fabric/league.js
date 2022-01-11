import { get, post } from '@utils/request'
import Vue from 'vue';

// 获取一页的联盟列表
export let getLeaguesOnePage = async (params = {}) => {
    try {
        let { code, data, message } = await get('/', {
            ...params
        });
        if (code == 200) {
            return data;
        } else {
            Vue.prototype.$message.error(message);
        }
    } catch (error) {
        console.log(error)
    }
}

// 选中组织查找一页的联盟列表
export let getLeaguesOnePageByOrgan = async (params = {}) => {
    try {
        let { code, data, message } = await get('/', {
            ...params
        });
        if (code == 200) {
            return data;
        } else {
            Vue.prototype.$message.error(message);
        }
    } catch (error) {
        console.log(error)
    }
}