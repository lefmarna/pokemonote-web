<template>
  <FormTemplate
    title="パスワード再設定の申請"
    button-text="パスワード再設定メールを送信する"
    :errors="errors"
    :is-loading="isLoading"
    @submit="login"
  >
    <template #default>
      <p>本人確認のためにメールをお送りします。メールに添付されたURLよりパスワードの再設定を行ってください。</p>
      <EmailField :email.sync="email" />
    </template>
    <template #links>
      <nuxt-link to="/login">ログインページへ戻る</nuxt-link>
    </template>
  </FormTemplate>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import { exceptionErrorToArray, updateMeta } from '@/utils/utilities'

export default defineComponent({
  middleware: 'noAuth',
  setup() {
    updateMeta('パスワード再設定の申請')

    const { $axios } = useContext()
    const router = useRouter()

    const email = ref('')

    const isLoading = ref(false)
    const errors = ref<string[]>()

    const login = async () => {
      isLoading.value = true

      try {
        const response = await $axios.post('/password/email', {
          email: email.value,
        })

        router.push('/password/confirm')

        console.log(response)
      } catch (error) {
        errors.value = exceptionErrorToArray(error)
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      errors,
      isLoading,
      login,
    }
  },
  head: {},
})
</script>
