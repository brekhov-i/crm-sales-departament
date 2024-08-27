<template>
  <div class="loginPage">
    <div class="loginPage__image"></div>
    <div class="loginPage__form">
      <h1 class="loginPage__title">Вход</h1>
      <Field id="email" label="Email" class="loginPage__form-field" :invalid="v$.email.$invalid" :error="v$.email.$errors[0]">
        <InputText v-model="v$.email.$model" id="email" />
      </Field>
      <Field id="password" label="Пароль" class="loginPage__form-field" :invalid="v$.password.$invalid" :error="v$.password.$errors[0]">
        <InputText v-model="v$.password.$model" id="password" :password="true"/>
      </Field>
      <Button @click="onSubmit()">Войти</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Field from '@/shared/ui/form/Field.vue';
import InputText from '@/shared/ui/form/InputText.vue';
import Button from '@/shared/ui/Button.vue';
import { email, helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useAuthStore } from '@/shared/store/AuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const rules = ref({
  email: {
    required: helpers.withMessage('Введите E-mail', required),
    email: helpers.withMessage('Ваш e-mail невалидный', email)
  },
  password: {
    required: helpers.withMessage('Введите пароль', required),
  }
})

const v$ = useVuelidate(rules, formData)

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()

  if(!isFormCorrect) return;

  await authStore.login(formData.value).then(() => {
    router.push({name: 'Home'})
  })
}
</script>

<style scoped lang="scss">
.loginPage {
  width: 100dvw;
  height: 100dvh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;

  &__image {
    width: 100%;
    height: 100%;
    background-color: lightcyan;
  }

  &__form {
    width: 480px;
    height: auto;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(#000000, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    padding: 30px 50px;

    &-field {
      margin-bottom: 20px;
    }
  }
}
</style>
