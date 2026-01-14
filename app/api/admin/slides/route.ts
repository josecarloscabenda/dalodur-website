import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const slidesPath = path.join(process.cwd(), 'data', 'slides.json')

// GET - Listar slides
export async function GET() {
  try {
    const data = await fs.readFile(slidesPath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Erro ao carregar slides:', error)
    return NextResponse.json({ slides: [] })
  }
}

// POST - Criar slide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image, active } = body

    const data = await fs.readFile(slidesPath, 'utf-8')
    const slidesData = JSON.parse(data)
    
    const newSlide = {
      id: Date.now().toString(),
      title,
      description,
      image,
      active: active !== undefined ? active : true,
      order: slidesData.slides.length + 1
    }

    slidesData.slides.push(newSlide)
    await fs.writeFile(slidesPath, JSON.stringify(slidesData, null, 2))

    return NextResponse.json({ success: true, slide: newSlide })
  } catch (error) {
    console.error('Erro ao criar slide:', error)
    return NextResponse.json(
      { error: 'Erro ao criar slide' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar slide
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, image, active } = body

    const data = await fs.readFile(slidesPath, 'utf-8')
    const slidesData = JSON.parse(data)
    
    const slideIndex = slidesData.slides.findIndex((s: any) => s.id === id)
    
    if (slideIndex === -1) {
      return NextResponse.json(
        { error: 'Slide não encontrado' },
        { status: 404 }
      )
    }

    slidesData.slides[slideIndex] = {
      ...slidesData.slides[slideIndex],
      title,
      description,
      image,
      active
    }

    await fs.writeFile(slidesPath, JSON.stringify(slidesData, null, 2))

    return NextResponse.json({ success: true, slide: slidesData.slides[slideIndex] })
  } catch (error) {
    console.error('Erro ao atualizar slide:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar slide' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir slide
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID do slide não fornecido' },
        { status: 400 }
      )
    }

    const data = await fs.readFile(slidesPath, 'utf-8')
    const slidesData = JSON.parse(data)
    
    slidesData.slides = slidesData.slides.filter((s: any) => s.id !== id)
    
    await fs.writeFile(slidesPath, JSON.stringify(slidesData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir slide:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir slide' },
      { status: 500 }
    )
  }
}
