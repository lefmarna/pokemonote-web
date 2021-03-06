import { Context } from '@nuxt/types'

export default function ({ store, redirect }: Context) {
  if (!store.getters.isLogin) return

  store.commit('updateRememberRoute', '')
  return redirect('/')
}
