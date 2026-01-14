import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo inválido. Use JPG, PNG ou WEBP' },
        { status: 400 }
      )
    }

    // Validar tamanho (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Tamanho máximo: 5MB' },
        { status: 400 }
      )
    }

    // Gerar nome único
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '-')
    const fileName = `${timestamp}-${originalName}`

    // Converter File para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Salvar arquivo
    const uploadPath = path.join(process.cwd(), 'public', 'slides', fileName)
    await writeFile(uploadPath, buffer)

    // Retornar caminho público
    const publicPath = `/slides/${fileName}`

    return NextResponse.json({
      success: true,
      path: publicPath,
      fileName: fileName
    })
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    )
  }
}

// Listar imagens existentes
export async function GET() {
  try {
    const fs = require('fs').promises
    const slidesDir = path.join(process.cwd(), 'public', 'slides')
    
    try {
      const files = await fs.readdir(slidesDir)
      const imageFiles = files
        .filter((file: string) => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map((file: string) => ({
          name: file,
          path: `/slides/${file}`
        }))
      
      return NextResponse.json({ images: imageFiles })
    } catch (error) {
      // Diretório não existe ainda
      return NextResponse.json({ images: [] })
    }
  } catch (error) {
    console.error('Erro ao listar imagens:', error)
    return NextResponse.json({ images: [] })
  }
}
