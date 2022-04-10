import $api from './index'

// 添加公告接口
export const addNoticle = async (data) => {
  const res = await $api.post('/article/add', data)
  return res
}
// 删除公告接口
export const deleteNoticle = async (data) => {
  return await $api.post('/article/delete', data)
}
// 修改公告接口
export const updateNoticle = async (data) => {
  return await $api.post('/article/update', data)
}
// 根据ID查找
export const getId = async (data) => {
  return await $api.post('/article/getId', data)
}
// 根据标题查找
export const getTitle = async (data) => {
  return await $api.post('/article/getTitle', data)
}
// 根据分类查找
export const getCate = async (data) => {
  return await $api.post('/article/getCate', data)
}
// 根据内容查找
export const getContent = async (data) => {
  return await $api.post('/article/getContent', data)
}
// 获取全部公告接口
export const getAllNoticle = async (data) => {
  return await $api.post('/article/getAll', data)
}
