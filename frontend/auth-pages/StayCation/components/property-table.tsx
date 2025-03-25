"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"

export function PropertyTable() {
  // Dados simulados de chácaras
  const properties = [
    {
      id: "1",
      title: "Chácara Recanto Verde",
      region: "Norte",
      price: 450,
      status: "active",
      views: 124,
    },
    {
      id: "2",
      title: "Chácara Águas Claras",
      region: "Sul",
      price: 380,
      status: "active",
      views: 87,
    },
    {
      id: "3",
      title: "Chácara Bela Vista",
      region: "Leste",
      price: 520,
      status: "pending",
      views: 34,
    },
    {
      id: "4",
      title: "Chácara Bosque Encantado",
      region: "Oeste",
      price: 490,
      status: "active",
      views: 56,
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Região</TableHead>
            <TableHead>Preço (R$/dia)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Visualizações</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>{property.region}</TableCell>
              <TableCell>R$ {property.price}</TableCell>
              <TableCell>
                <Badge variant={property.status === "active" ? "default" : "outline"}>
                  {property.status === "active" ? "Ativo" : "Pendente"}
                </Badge>
              </TableCell>
              <TableCell>{property.views}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/properties/${property.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Visualizar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/properties/${property.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

