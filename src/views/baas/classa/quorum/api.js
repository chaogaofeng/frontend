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
  delConsort: "/baas/alliance/quorumAlliance/delete", //删除联盟
};
export default quorumApi;
