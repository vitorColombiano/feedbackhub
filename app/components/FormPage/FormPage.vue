<script setup lang="ts">
import * as v from 'valibot'
import { reactive, watch } from 'vue'
import type { Feedback } from '../../types/feedback'
import { useFeedback } from '../../composables/useFeedback'
import { UButton, UForm, UFormField, UInput, UTextarea } from '#components'

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

const { feedbackData, updateFeedback, generatePDF, clearFeedback, isLoading, error } = useFeedback()

const state = reactive<Feedback>({
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

watch(feedbackData, (newData) => {
  Object.assign(state, newData)
}, { immediate: true, deep: true })

watch(state, (newState) => {
  updateFeedback(newState)
}, { deep: true })

const onSubmit = async (event: { data: Schema }) => {
  await generatePDF(event.data)
}

const handleClear = () => {
  clearFeedback()
}
</script>

<template>
  <div v-if="error" class="text-red-500 text-sm mt-2">
    {{ error }}
  </div>

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

    <div class="flex flex-col md:flex-row gap-4 mt-6">
      <UButton
        class="flex-1 p-3 text-xl mx-auto block"
        size="xl"
        label="Gerar Feedback"
        type="submit"
        :loading="isLoading"
        :disabled="isLoading"
      />
      <UButton
        class="flex-1 p-3 text-xl mx-auto block"
        size="xl"
        label="Limpar"
        variant="outline"
        color="neutral"
        @click="handleClear"
        :disabled="isLoading"
      />
    </div>
  </UForm>
</template>
