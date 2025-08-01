"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface BibliotecaImagensProps {
  onSelectImage: (imageUrl: string) => void
}

export function BibliotecaImagens({ onSelectImage }: BibliotecaImagensProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Lista de imagens da pasta iFood
  const [imagens, setImagens] = useState([])
  
  // Carregar imagens da pasta iFood
  useEffect(() => {
    // Função para carregar imagens da pasta iFood
    const carregarImagensIFood = async () => {
      try {
        // Lista de arquivos da pasta iFood
        const imagensIFood = [
          "/iFood/0_0 (1).jpg",
          "/iFood/0_0 (2).jpg",
          "/iFood/0_0 (3).jpg",
          "/iFood/0_0 (4).jpg",
          "/iFood/0_0 (5).jpg",
          "/iFood/0_0 (6).jpg",
          "/iFood/0_0 (7).jpg",
          "/iFood/0_0.jpg",
          "/iFood/0_1 (1).jpg",
          "/iFood/0_1.jpg",
          "/iFood/0_2 (1).jpg",
          "/iFood/0_2 (2).jpg",
          "/iFood/0_2.jpg",
          "/iFood/0_3.jpg",
          "/iFood/image - 2025-08-01T142551.529.png",
          "/iFood/pupila_01_77080_Candid_Photography_shot_on_Sony_A7R_IV_of_a_Gir_ad27397b-c7f2-40b7-9a7b-c287a15328bd-U4.png",
          "/iFood/pupila_02_41584_Candid_Photography_shot_on_Sony_A7R_IV_of_a_Bra_b27ae3cb-04f9-42da-895e-b6a0d12e8726-U2.png",
          "/iFood/pupila_02_41584_Candid_Photography_shot_on_Sony_A7R_IV_of_a_Wom_62885095-b6c1-4853-91ca-b5b999649d60-U2.png",
          "/iFood/pupila_02_41584_Candid_Photography_shot_on_Sony_A7R_IV_of_a_Wom_ffe6b26b-3632-4939-8a13-339a0a0b551a-U2.png",
          "/iFood/pupila_05_83041_Candid_Photography_shot_on_Sony_A7R_IV_of_a_You_15e662dd-b18c-4634-a674-1daff7e39855-U3.png",
          "/iFood/pupila_07_17938_Candid_Photography_shot_on_Sony_A7R_IV_of_a_Wom_1fddc850-4d1b-49dc-9856-56b4e39dbdc2-U2.png",
        ]
        
        // Gerar descrições e tags aleatórias para as imagens
        const descricoes = [
          "Entrega iFood rápida",
          "Pedido iFood em casa",
          "Entregador iFood",
          "App iFood em uso",
          "Refeição iFood",
          "Pedido chegando",
          "Comida fresca iFood",
          "iFood no celular",
          "Pedido em trânsito",
          "Refeição completa iFood"
        ]
        
        const tagOptions = [
          ["ifood", "entrega", "app", "pedido"],
          ["ifood", "comida", "delivery", "refeição"],
          ["ifood", "restaurante", "app", "mobile"],
          ["ifood", "entregador", "moto", "entrega"],
          ["ifood", "campanha", "marketing", "propaganda"]
        ]
        
        // Adicionar as imagens do iFood à lista de imagens
        const novasImagens = imagensIFood.map((caminho, index) => {
          // Gerar descrição e tags aleatórias
          const descricaoIndex = Math.floor(Math.random() * descricoes.length)
          const tagIndex = Math.floor(Math.random() * tagOptions.length)
          
          return {
            id: `ifood-${index + 1}`,
            url: caminho,
            alt: descricoes[descricaoIndex],
            tags: tagOptions[tagIndex],
          }
        })

        // Atualizar a lista de imagens somente com as imagens do iFood
        setImagens(novasImagens)
      } catch (error) {
        console.error("Erro ao carregar imagens do iFood:", error)
      }
    }
    
    carregarImagensIFood()
  }, [])

  // Filtra imagens com base no termo de busca
  const imagensFiltradas = searchTerm
    ? imagens.filter(
        (img) =>
          img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : imagens

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Selecionar da Biblioteca
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Biblioteca de Imagens</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar imagens..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1">
          {imagensFiltradas.map((imagem) => (
            <div
              key={imagem.id}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-md border hover:border-blue-500 transition-all"
              onClick={() => {
                onSelectImage(imagem.url)
              }}
            >
              <img src={imagem.url || "/placeholder.svg"} alt={imagem.alt} className="h-full w-full object-cover" />
            </div>
          ))}
          {imagensFiltradas.length === 0 && (
            <div className="col-span-3 py-8 text-center text-gray-500">
              Nenhuma imagem encontrada para "{searchTerm}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
