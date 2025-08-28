<script setup lang="ts">
import { UButton, UForm, UFormField, UInput, UTextarea } from '#components'
import { ref, reactive } from 'vue'
import * as v from 'valibot'

const schema = v.object({
  fromName: v.pipe(v.string(), v.minLength(1, 'Seu nome é obrigatório')),
  toName: v.pipe(v.string(), v.minLength(1, 'O nome do destinatário é obrigatório')),
  date: v.pipe(v.string(), v.minLength(1, 'A data é obrigatória')),
  situation: v.pipe(v.string(), v.minLength(1, 'A situação é obrigatória')),
  behavior: v.pipe(v.string(), v.minLength(1, 'O comportamento é obrigatório')),
  impact: v.pipe(v.string(), v.minLength(1, 'O impacto é obrigatório')),
  strengths: v.pipe(v.string(), v.minLength(1, 'Os pontos fortes são obrigatórios')),
  improvements: v.pipe(v.string(), v.minLength(1, 'As melhorias são obrigatórias')),
  finalMessage: v.pipe(v.string(), v.minLength(1, 'A mensagem final é obrigatória'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
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

const onSubmit = async (event: { data: Schema }) => {
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event.data)
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'feedback.pdf'
      link.click()
      window.URL.revokeObjectURL(url)
    } else {
      const errorText = await response.text()
      console.error('Mensagem de erro:', errorText)
    }
  } catch (error) {
    console.error('Erro ao enviar os dados:', error)
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UFormField class="text-lg" label="Nome" name="fromName">
        <UInput class="w-full" v-model="state.fromName" />
      </UFormField>

      <UFormField class="text-lg" label="Destinatário" name="toName">
        <UInput class="w-full" v-model="state.toName" />
      </UFormField>

      <UFormField class="text-lg" label="Data" name="date">
        <UInput class="w-full" v-model="state.date" type="date" />
      </UFormField>
    </div>

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
