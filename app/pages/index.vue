<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-7xl text-(--ui-primary)">
      FeedbackHub
    </h1>

    <p class="font-extralight text-gray-300 text-2xl">Construa feedbacks estruturados para compartilhar com o seu time</p>

    <div class="flex items-center gap-2">
      <UButton
        class="p-3 text-2xl"
        label="Criar Feedback"
        icon="i-lucide-sun"
        to="/form"
        target="_blank"
      />
    </div>
  </div>
</template>
