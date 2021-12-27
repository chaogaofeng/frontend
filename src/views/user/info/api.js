const infoApi = {
  userInfo: "/baas/user/sysUser/detail", //当前登录用户详情
  authUser: "/baas/user/sysUser/authUser", //用户认证
  resetPwd: "/baas/user/sysUser/resetPwd", //重置密码
  userDel: "/baas/user/sysUser/delete", //删除账号
  editEmail: "/baas/user/sysUser/editEmail", //修改邮箱
  secretKey: "baas/secret/secretKey/pageList", //秘钥管理
  upload: "http://8.211.163.33:2022/baas/attachment/upload", //上传附件
  secretAdd: "/baas/secret/secretKey/add", //新增秘钥
};
export default infoApi;
