import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Carregar configurações de email
    const configPath = path.join(process.cwd(), 'data', 'email-config.json')
    let emailConfig = {
      enabled: false,
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      recipientEmail: 'geral@dalodursolutions.com'
    }

    try {
      const configData = await fs.readFile(configPath, 'utf-8')
      emailConfig = JSON.parse(configData)
    } catch (error) {
      // Se não existe configuração, apenas salvar a mensagem
    }

    // Salvar mensagem em arquivo JSON
    const messagesPath = path.join(process.cwd(), 'data', 'messages.json')
    let messages = []

    try {
      const data = await fs.readFile(messagesPath, 'utf-8')
      messages = JSON.parse(data)
    } catch (error) {
      // Arquivo não existe ainda
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      message,
      date: new Date().toISOString(),
      read: false
    }

    messages.unshift(newMessage)
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2))

    // Aqui você pode adicionar lógica de envio de email se configurado
    // Por enquanto, apenas salvamos a mensagem

    return NextResponse.json({ 
      success: true, 
      message: 'Mensagem recebida com sucesso!' 
    })
  } catch (error) {
    console.error('Erro ao processar contato:', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem' },
      { status: 500 }
    )
  }
}
