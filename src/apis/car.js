import $api from './index'
// 获取所有车信息
export const getAllCar = async data => {
  const res = await $api.post('/driver/checkcar', data)
  return res
}
// 获取一辆车信息
export const getOneCar = async data => {
  const res = await $api.post('/driver/findOneCar', data)
  return res
}
// 添加一辆车
export const addOneCar = async data => {
  const res = await $api.post('/driver/addcar', data)
  return res
}
// 删除一辆车
export const remOneCar = async data => {
  const res = await $api.post('/driver/removecar', data)
  return res
}
// 修改车信息
export const upOneCar = async data => {
  const res = await $api.post('/driver/updatecar', data)
  return res
}
