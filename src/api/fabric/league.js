const fabricPrefix = "/fabricApi";
const leagueList = {
  "createOneLeague": fabricPrefix + "/baas/alliance/fabricAlliance/add",  
  "delOneLeague": fabricPrefix + "/baas/alliance/fabricAlliance/delete/",
  "getLeagueByPage": fabricPrefix + "/baas/alliance/fabricAlliance/pageList",
  "getAllLeague": fabricPrefix + "/baas/alliance/fabricAlliance/get/",
};

export default leagueList;