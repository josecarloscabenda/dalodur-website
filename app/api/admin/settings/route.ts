import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const configPath = path.join(process.cwd(), 'data', 'email-config.json')

// GET - Carregar configurações
export async function GET() {
  try {
    const data = await fs.readFile(configPath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    // Retornar configuração padrão se não existir
    return NextResponse.json({
      enabled: false,
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      recipientEmail: 'geral@dalodursolutions.com',
      fromName: 'Dalodur Solutions - Website'
    })
  }
}

// POST - Salvar configurações
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    await fs.writeFile(configPath, JSON.stringify(body, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar configurações:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar configurações' },
      { status: 500 }
    )
  }
}
