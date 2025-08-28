<script setup lang="ts">
import { UButton, UForm, UFormField, UInput, UTextarea } from '#components'
import { ref } from 'vue'

const state = ref({
  fromName: '',
  toName: '',
  date: '',
  situation: '',
  behavior: '',
  impact: '',
  strengths: '',
  improvements: '',
  finalMessage: ''
})

const schema = {
  fromName: { required: true },
  toName: { required: true },
  date: { required: true },
  situation: { required: true },
  behavior: { required: true },
  impact: { required: true },
  strengths: { required: true },
  improvements: { required: true },
  finalMessage: { required: true }
}

const onSubmit = () => {
  alert('Feedback estruturado gerado com sucesso!')
  state.value = {
    fromName: '',
    toName: '',
    date: '',
    situation: '',
    behavior: '',
    impact: '',
    strengths: '',
    improvements: '',
    finalMessage: ''
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
    <UFormField class="text-lg" label="Seu nome" name="fromName">
      <UInput class="w-full" v-model="state.fromName" />
    </UFormField>

    <UFormField class="text-lg" label="Nome da pessoa que receberá o feedback" name="toName">
      <UInput class="w-full" v-model="state.toName" />
    </UFormField>

    <UFormField class="text-lg" label="Data" name="date">
      <UInput class="w-full" v-model="state.date" type="date" />
    </UFormField>

    <UFormField class="text-lg" label="Situação" name="situation">
      <UTextarea class="w-full" v-model="state.situation" />
    </UFormField>

    <UFormField class="text-lg" label="Comportamento observado" name="behavior">
      <UTextarea class="w-full" v-model="state.behavior" />
    </UFormField>

    <UFormField class="text-lg" label="Impacto gerado" name="impact">
      <UTextarea class="w-full" v-model="state.impact" />
    </UFormField>

    <UFormField class="text-lg" label="Pontos fortes" name="strengths">
      <UTextarea class="w-full" v-model="state.strengths" />
    </UFormField>

    <UFormField class="text-lg" label="O que pode melhorar" name="improvements">
      <UTextarea class="w-full" v-model="state.improvements" />
    </UFormField>

    <UFormField class="text-lg" label="Mensagem final de incentivo" name="finalMessage">
      <UTextarea class="w-full" v-model="state.finalMessage" />
    </UFormField>

    <UButton class="mt-4 p-3 text-xl mx-auto block" size="xl" label="Gerar Feedback" type="submit" />
  </UForm>
</template>

