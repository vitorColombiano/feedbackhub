import { defineEventHandler, readBody } from 'h3'
import puppeteer from 'puppeteer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    fromName,
    toName,
    date,
    situation,
    behavior,
    impact,
    strengths,
    improvements,
    finalMessage
  } = body

  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          p { margin: 6px 0; }
        </style>
      </head>
      <body>
        <h1>Feedback</h1>
        <p><strong>De:</strong> ${fromName}</p>
        <p><strong>Para:</strong> ${toName}</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Situação:</strong> ${situation}</p>
        <p><strong>Comportamento:</strong> ${behavior}</p>
        <p><strong>Impacto:</strong> ${impact}</p>
        <p><strong>Pontos Fortes:</strong> ${strengths}</p>
        <p><strong>Melhorias:</strong> ${improvements}</p>
        <p><strong>Mensagem Final:</strong> ${finalMessage}</p>
      </body>
    </html>
  `

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  })

  await browser.close()

  event.node.res.setHeader('Content-Type', 'application/pdf')
  event.node.res.setHeader('Content-Disposition', `attachment; filename="${toName}_feedback.pdf"`)
  return pdfBuffer
})
