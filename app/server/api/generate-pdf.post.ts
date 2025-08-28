import { defineEventHandler, readBody } from 'h3'
import { PDFDocument, rgb } from 'pdf-lib'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Crie um novo documento PDF
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 800])

  // Adicione conteúdo ao PDF
  const { fromName, toName, date, situation, behavior, impact, strengths, improvements, finalMessage } = body

  page.drawText(`Feedback`, { x: 50, y: 750, size: 20, color: rgb(0, 0, 0) })
  page.drawText(`De: ${fromName}`, { x: 50, y: 720, size: 12 })
  page.drawText(`Para: ${toName}`, { x: 50, y: 700, size: 12 })
  page.drawText(`Data: ${date}`, { x: 50, y: 680, size: 12 })
  page.drawText(`Situação: ${situation}`, { x: 50, y: 660, size: 12 })
  page.drawText(`Comportamento: ${behavior}`, { x: 50, y: 640, size: 12 })
  page.drawText(`Impacto: ${impact}`, { x: 50, y: 620, size: 12 })
  page.drawText(`Pontos Fortes: ${strengths}`, { x: 50, y: 600, size: 12 })
  page.drawText(`Melhorias: ${improvements}`, { x: 50, y: 580, size: 12 })
  page.drawText(`Mensagem Final: ${finalMessage}`, { x: 50, y: 560, size: 12 })

  // Gere o PDF como um buffer
  const pdfBytes = await pdfDoc.save()

  // Retorne o PDF como resposta
  event.node.res.setHeader('Content-Type', 'application/pdf')
  event.node.res.setHeader('Content-Disposition', 'attachment; filename="feedback.pdf"')
  return pdfBytes
})
