import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validação básica
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuário e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Carregar usuários
    const usersPath = path.join(process.cwd(), 'data', 'users.json')
    const usersData = await fs.readFile(usersPath, 'utf-8')
    const { users } = JSON.parse(usersData)

    // Verificar credenciais (versão simplificada - na produção usar bcrypt)
    // Para demo: admin / admin123
    const user = users.find((u: any) => u.username === username)
    
    if (!user || password !== 'admin123') {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Criar sessão (simplificado - na produção usar JWT ou sessões adequadas)
    const response = NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })

    // Definir cookie de sessão
    response.cookies.set('admin_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 horas
    })

    return response
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    )
  }
}
