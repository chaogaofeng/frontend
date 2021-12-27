const loginApi = {
  register: "/baas/user/sysUser/register", //注册
  login: "/baas/user/sysUser/login", //登录
  resetPwd: "/baas/user/sysUser/resetPwd", //重置密码
  sendcode: "/baas/sms/sms/send", //发送验证码
  checkcode: "/baas/sms/sms/check", //校验短信验证码
};

export default loginApi;
