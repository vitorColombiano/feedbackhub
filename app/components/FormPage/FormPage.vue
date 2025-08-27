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
  console.log('Feedback gerado:', state.value)
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
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Seu nome" name="fromName">
      <UInput v-model="state.fromName" />
    </UFormField>

    <UFormField label="Nome da pessoa que receberá o feedback" name="toName">
      <UInput v-model="state.toName" />
    </UFormField>

    <UFormField label="Data" name="date">
      <UInput v-model="state.date" type="date" />
    </UFormField>

    <UFormField label="Situação" name="situation">
      <UTextarea v-model="state.situation" />
    </UFormField>

    <UFormField label="Comportamento observado" name="behavior">
      <UTextarea v-model="state.behavior" />
    </UFormField>

    <UFormField label="Impacto gerado" name="impact">
      <UTextarea v-model="state.impact" />
    </UFormField>

    <UFormField label="Pontos fortes" name="strengths">
      <UTextarea v-model="state.strengths" />
    </UFormField>

    <UFormField label="O que pode melhorar" name="improvements">
      <UTextarea v-model="state.improvements" />
    </UFormField>

    <UFormField label="Mensagem final de incentivo" name="finalMessage">
      <UTextarea v-model="state.finalMessage" />
    </UFormField>

    <UButton type="submit">Gerar Feedback</UButton>
  </UForm>
</template>

