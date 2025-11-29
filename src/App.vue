<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Feedbacks } from './types/Feedbacks';
import { feedbackOptions } from './consts/feedbackOptions';

const feedback = ref<string>("")
const feedbackList = ref<Feedbacks[]>([])
const selectedType = ref<string>(feedbackOptions[0] ?? 'positive');

const feedbackPositives = computed(() =>
  feedbackList.value.filter((item: Feedbacks) => item.type === 'positive')
);

const feedbackNegatives = computed(() =>
  feedbackList.value.filter((item: Feedbacks) => item.type === 'negative')
);

const hasFeedbacks = computed(() => feedbackList.value.length > 0);

function submitFeedback() {
  window.alert('O seu feedback foi registrado');
  feedbackList.value.push({ feedback: feedback.value, type: selectedType.value });
  feedback.value = "";
}
</script>

<template>
  <main class="min-h-screen flex flex-col justify-between">
    <header class="bg-green-300 text-center p-5">
      <h1 class="font-mono text-2xl">FeedbackHub - Organização de Feedbacks em um só lugar</h1>
      <p class="text-sm font-mono">Welcome to FeedbackHub!</p>
    </header>
    <section class="m-8 md:my-10 md:mx-28 p-5 border border-gray-300 rounded-lg text-center bg-white">
      <h2 class="font-mono text-xl">
        Esse é um projeto feito com vue 3 + vite + tailwindcss para organizar feedbacks de diversos produtos em um só lugar.
      </h2>
      <form @submit.prevent="submitFeedback" class="mt-4">
        <label v-for="option in feedbackOptions" :key="option" class="mx-3">
          <input
            type="radio"
            :value="option"
            v-model="selectedType"
            :checked="selectedType === option"
            @change="selectedType = option"
          />
          {{ option }}
        </label>
        <textarea
          v-model="feedback"
          class="border border-gray-300 rounded-lg w-full h-40 p-4 mt-6"
          placeholder="Registre o seu feedback aqui..."
        ></textarea>
        <button type="submit" class="bg-green-200 p-4 rounded-2xl mt-6">
          Adiconar Feedback
        </button>
      </form>
    </section>
    <section v-if="hasFeedbacks" class="m-10 md:my-10 md:mx-28 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="font-mono text-xl mb-4">Feedbacks Positivos</h2>
        <div v-for="feedbackItem in feedbackPositives" class="border border-green-600 p-4 rounded-2xl mt-6 w-full bg-white">
          <p class="font-mono text-sm">
            {{ feedbackItem.feedback }}
          </p>
        </div>
      </div>
      <div>
        <h2 class="font-mono text-xl mb-4">Feedbacks Negativos</h2>
        <div v-for="feedbackItem in feedbackNegatives" class="border border-red-600 p-4 rounded-2xl mt-6 w-full bg-white">
          <p class="font-mono text-sm">
            {{ feedbackItem.feedback }}
          </p>
        </div>
      </div>
    </section>
    <footer class="bg-green-300 text-center p-5 mt-10">
      <p class="font-mono text-sm">© 2025 FeedbackHub. Todos os direitos reservados.</p>
    </footer>
  </main>
</template>
