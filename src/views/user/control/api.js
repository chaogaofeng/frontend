const controlApi = {
  addRole: "/baas/role/sysRole/addRole", //创建角色
  editRole: "/baas/role/sysRole/update", //修改角色
  delRole: "/baas/role/sysRole/delete", //删除角色
  roleListPage: "/baas/role/sysRole/pageList", //分页获取角色列表
  policyMeta: "/baas/permissionmeta/sysPermissionMeta/list", //获取策略元数据
  addPolicy: "/baas/strategy/sysStrategy/add", //新建策略
  policyListPage: "/baas/strategy/sysStrategy/pageList", //分页获取策略列表
  policyList: "/baas/strategy/sysStrategy/list", //获取策略列表
  editPolicy: "/baas/strategy/sysStrategy/update", //修改策略
  delPolicy: "/baas/strategy/sysStrategy/delete", //删除策略
  agementlistPage: "/baas/user/sysUser/subUser/pageList", //分页获取子用户列表
  addAgementlist: "/baas/user/sysUser/addUser", //创建子用户
  editAgementPass: "/baas/user/sysUser/resetPwd", //修改子用户密码
  delAgementlist: "/baas/user/sysUser/delete", //删除子用户
  stateAgementlist: "/baas/user/sysUser/updateStatus", //更改子用户状态
  roleList: "/baas/role/sysRole/list", //获取角色列表
  updateRoles: "/baas/user/sysUser/updateRoles", //更改用户角色
};
export default controlApi;
