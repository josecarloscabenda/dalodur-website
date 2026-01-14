import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const messagesPath = path.join(process.cwd(), 'data', 'messages.json')

// GET - Listar mensagens
export async function GET() {
  try {
    const data = await fs.readFile(messagesPath, 'utf-8')
    const messages = JSON.parse(data)
    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json({ messages: [] })
  }
}

// PUT - Marcar como lida
export async function PUT(request: NextRequest) {
  try {
    const { id, read } = await request.json()

    const data = await fs.readFile(messagesPath, 'utf-8')
    const messages = JSON.parse(data)
    
    const messageIndex = messages.findIndex((m: any) => m.id === id)
    
    if (messageIndex === -1) {
      return NextResponse.json(
        { error: 'Mensagem não encontrada' },
        { status: 404 }
      )
    }

    messages[messageIndex].read = read
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao atualizar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar mensagem' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir mensagem
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID da mensagem não fornecido' },
        { status: 400 }
      )
    }

    const data = await fs.readFile(messagesPath, 'utf-8')
    let messages = JSON.parse(data)
    
    messages = messages.filter((m: any) => m.id !== id)
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir mensagem' },
      { status: 500 }
    )
  }
}
