const quorumApi = {
  addOrg: "/baas/org/quorumOrg/add", //新增组织
  orgListpage: "/baas/org/quorumOrg/pageList", //分页获取组织
  orgList: "/baas/org/quorumOrg/list", //获取组织
  orgListDetaile: "/baas/org/quorumOrg/get", //组织详情
  delOrg: "/baas/org/quorumOrg/delete", //删除组织
  addConsort: "/baas/alliance/quorumAlliance/add", //新增联盟
  getValByKey: "/baas/dict/getValByKey", //查询付费设置
  consortPage: "/baas/alliance/quorumAlliance/pageList", //分页获取联盟
  consortDetaile: "/baas/alliance/quorumAlliance/get", //联盟详情
  outConsort: "/baas/org/quorumOrg/exitFromAlliance", //退出联盟
  invitConsort: "/baas/event/eventCenter/inviteAdd2Alliance", //邀请加入联盟
  getEvent: "/baas/event/eventCenter/pageList", //事件列表
  inviteApprove: "/baas/event/eventCenter/inviteApprove", //邀请审批
  applyApprove: "/baas/event/eventCenter/applyApprove", //接受审批
  quorumNode: "/baas/node/chainNode/nodeList", //节点列表
  contractTemp: "/baas/temp/contractTemp/list", //合约模板列表
  contractDeploy: "/baas/deploy/contractDeploy/list", //已部署的合约列表
  contractDeployDetaile: "/baas/deploy/contractDeploy/get", //已部署的合约详情
  createRpcAccount: "/baas/rpc/rpcFirewall/createRpcAccount", //创建 json-rpc 账号
  rpcFirewall: "/baas/rpc/rpcFirewall/pageList", //获取 json-rpc 账号
  rpcInvoke: "/baas/rpc/rpcInvoke/invoke", //rpc 调用
};
export default quorumApi;
