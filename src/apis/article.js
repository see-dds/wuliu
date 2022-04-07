import $api from './index'

// 发布公告
export const addNoticle = async (data) => {
  const res = await $api.post('/article/add', data)
  return res
}
export const deleteNoticle = async (data) => {
  return await $api.post('/article/delete', data)
}

export const updateNoticle = async (data) => {
  return await $api.post('/article/update', data)
}

export const getId = async (data) => {
  return await $api.post('/article/getId', data)
}

export const getTitle = async (data) => {
  return await $api.post('/article/getTitle', data)
}

export const getCate = async (data) => {
  return await $api.post('/article/getCate', data)
}

export const getContent = async (data) => {
  return await $api.post('/article/getContent', data)
}

export const getAllNoticle = async (data) => {
  return await $api.post('/article/getAll', data)
}
