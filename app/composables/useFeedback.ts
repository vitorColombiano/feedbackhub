import type { Feedback } from '../types/feedback'

export const useFeedback = () => {
  const feedbackData = ref<Feedback>({
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

  const isLoading = ref(false)

  const error = ref<string | null>(null)

  const STORAGE_KEY = 'feedback-data'

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedData = JSON.parse(stored) as Feedback
        feedbackData.value = { ...feedbackData.value, ...parsedData }
      }
    } catch (err) {
      console.warn('Erro ao carregar dados do localStorage:', err)
    }
  }

  const saveToStorage = (data: Feedback) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (err) {
      console.warn('Erro ao salvar dados no localStorage:', err)
    }
  }

  const updateFeedback = (data: Partial<Feedback>) => {
    feedbackData.value = { ...feedbackData.value, ...data }
    saveToStorage(feedbackData.value)
  }

  const clearFeedback = () => {
    feedbackData.value = {
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
    if (process.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const generatePDF = async (data: Feedback): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `feedback-${data.toName}-${data.date}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      updateFeedback(data)

      return true
    } catch (err: any) {
      console.error('Erro ao gerar PDF:', err)
      error.value = err.message || 'Erro ao gerar PDF'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const isValid = computed(() => {
    const required: (keyof Feedback)[] = [
      'fromName', 'toName', 'date', 'situation',
      'behavior', 'impact', 'strengths', 'improvements', 'finalMessage'
    ]
    return required.every(field =>
      feedbackData.value[field] && feedbackData.value[field].trim().length > 0
    )
  })

  onMounted(() => {
    loadFromStorage()
  })

  watch(
    feedbackData,
    (newData) => {
      saveToStorage(newData)
    },
    { deep: true }
  )

  return {
    feedbackData: readonly(feedbackData),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isValid,
    updateFeedback,
    clearFeedback,
    generatePDF,
    loadFromStorage
  }
}
