import { get, post } from '@utils/request'
import Vue from 'vue';

// 获取一页的组织列表
export let getOrgansOnePage = async (params = {}) => {
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

// 删除组织
export let delOneOrgan = async (params = {}) => {
  try {
      let { code, data, message } = await post('/', {
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

// 通过组织id获取组织的详情
export let getOneOrganDetail = async (params = {}) => {
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