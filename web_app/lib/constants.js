export const BLJ_PROJ = process.env.BLJ_PROJ, //path to where pipelines are saved
  BLJ = process.env.BLJ, //path to blj
  BLJ_CONFIG = process.env.BLJ_CONFIG, //path to where configs are saved
  HOST_BLJ = process.env.HOST_BLJ; //path to host BLJ

export const port = normalizePort(process.env.PORT || '3000');