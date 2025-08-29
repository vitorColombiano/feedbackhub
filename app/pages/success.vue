<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-5xl text-(--ui-secondary)">
      Feedback gerado com sucesso!
    </h1>

    <UIcon class="text-(--ui-primary)" name="i-lucide-check-circle" size="96" />

    <div class="flex items-center gap-2">
      <UButton
        class="p-3 text-2xl"
        label="Voltar para home"
        icon="i-lucide-home"
        color="secondary"
        to="/"
      />
    </div>
  </div>
</template>
