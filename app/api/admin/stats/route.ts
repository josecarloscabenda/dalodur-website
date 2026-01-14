import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    // Carregar slides
    const slidesPath = path.join(process.cwd(), 'data', 'slides.json')
    const slidesData = await fs.readFile(slidesPath, 'utf-8')
    const { slides } = JSON.parse(slidesData)

    // Carregar mensagens
    const messagesPath = path.join(process.cwd(), 'data', 'messages.json')
    let messages = []
    try {
      const messagesData = await fs.readFile(messagesPath, 'utf-8')
      messages = JSON.parse(messagesData)
    } catch (error) {
      // Arquivo não existe ainda
    }

    const stats = {
      slides: slides.length,
      messages: messages.length,
      unreadMessages: messages.filter((m: any) => !m.read).length
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar estatísticas' },
      { status: 500 }
    )
  }
}
