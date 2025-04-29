
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCompaniesWithRatings } from "@/services/company-ratings";
import { RatingDialog } from "./RatingDialog";
import { Star, Filter, SortDesc, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";

type FilterOptions = {
  sector: string | null;
  approvalStatus: string | null;
  minRating: number | null;
};

type SortOption = "rating" | "name" | "approvalStatus";

export function CompanyDashboard() {
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompaniesWithRatings,
  });

  const [filters, setFilters] = useState<FilterOptions>({
    sector: null,
    approvalStatus: null,
    minRating: null,
  });

  const [sort, setSort] = useState<{ by: SortOption; direction: "asc" | "desc" }>({
    by: "rating",
    direction: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique sectors for filtering
  const sectors = Array.from(new Set(companies.map((c) => c.sector).filter(Boolean))) as string[];

  // Filter companies based on current filters
  const filteredCompanies = companies.filter((company) => {
    // Search term filter
    if (
      searchTerm &&
      !company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Sector filter
    if (filters.sector && company.sector !== filters.sector) {
      return false;
    }

    // Approval status filter
    if (
      filters.approvalStatus &&
      company.rating?.approval_status !== filters.approvalStatus
    ) {
      return false;
    }

    // Rating filter
    if (
      filters.minRating !== null &&
      (!company.rating || company.rating.rating < filters.minRating)
    ) {
      return false;
    }

    return true;
  });

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const direction = sort.direction === "asc" ? 1 : -1;

    if (sort.by === "rating") {
      const ratingA = a.rating?.rating ?? 0;
      const ratingB = b.rating?.rating ?? 0;
      return (ratingB - ratingA) * direction;
    } 
    
    if (sort.by === "name") {
      return a.company_name.localeCompare(b.company_name) * direction;
    }

    if (sort.by === "approvalStatus") {
      const statusA = a.rating?.approval_status ?? "";
      const statusB = b.rating?.approval_status ?? "";
      return statusA.localeCompare(statusB) * direction;
    }

    return 0;
  });

  // Export table as image for reporting
  const exportTableAsImage = async () => {
    try {
      const tableElement = document.getElementById("company-table");
      if (tableElement) {
        const canvas = await html2canvas(tableElement);
        const image = canvas.toDataURL("image/png", 1.0);
        const downloadLink = document.createElement("a");
        downloadLink.href = image;
        downloadLink.download = "ford360-company-rankings.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      console.error("Error exporting table:", error);
    }
  };

  const toggleSortDirection = () => {
    setSort((prev) => ({
      ...prev,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  if (isLoading) {
    return <div className="p-8 text-center">Carregando empresas...</div>;
  }

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative w-full md:w-auto">
            <Input
              className="w-full md:w-60"
              placeholder="Buscar empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-2">
                <label className="text-sm font-medium">Setor</label>
                <Select
                  value={filters.sector || ""}
                  onValueChange={(value) =>
                    setFilters({ ...filters, sector: value || null })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={filters.approvalStatus || ""}
                  onValueChange={(value) =>
                    setFilters({ ...filters, approvalStatus: value || null })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="Approved">Aprovado</SelectItem>
                    <SelectItem value="Under Evaluation">Em Avaliação</SelectItem>
                    <SelectItem value="Not Approved">Não Aprovado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-2">
                <label className="text-sm font-medium">Avaliação mínima</label>
                <Select
                  value={filters.minRating?.toString() || ""}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      minRating: value ? Number(value) : null,
                    })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Qualquer</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <SortDesc className="mr-2 h-4 w-4" />
                Ordenar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sort.by === "rating"}
                onCheckedChange={() => setSort({ ...sort, by: "rating" })}
              >
                Avaliação
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.by === "name"}
                onCheckedChange={() => setSort({ ...sort, by: "name" })}
              >
                Nome
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort.by === "approvalStatus"}
                onCheckedChange={() => setSort({ ...sort, by: "approvalStatus" })}
              >
                Status
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sort.direction === "desc"}
                onCheckedChange={toggleSortDirection}
              >
                Decrescente
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          {/* Export functionality */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={exportTableAsImage}
            className="h-10"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar para Relatório
          </Button>
        </div>
      </div>

      {/* Display number of results */}
      <div className="text-sm text-gray-400">
        {sortedCompanies.length} {sortedCompanies.length === 1 ? "empresa" : "empresas"} encontradas
      </div>

      {/* Companies table */}
      <div className="bg-ford-charcoal rounded-lg overflow-hidden" id="company-table">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Receita Anual Est.</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Nenhuma empresa encontrada com os filtros selecionados
                  </TableCell>
                </TableRow>
              ) : (
                sortedCompanies.map((company, index) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-semibold text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">{company.company_name}</TableCell>
                    <TableCell>{company.sector || "—"}</TableCell>
                    <TableCell>{company.estimated_annual_revenue || "—"}</TableCell>
                    <TableCell>
                      {company.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-ford-blue text-ford-blue" />
                          <span>{company.rating.rating}</span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          company.rating?.approval_status === "Approved"
                            ? "bg-green-500/20 text-green-500"
                            : company.rating?.approval_status === "Not Approved"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {company.rating?.approval_status
                          ? company.rating.approval_status === "Approved"
                            ? "Aprovado"
                            : company.rating.approval_status === "Not Approved"
                            ? "Não Aprovado"
                            : "Em Avaliação"
                          : "Pendente"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <RatingDialog
                        company={company}
                        existingRating={company.rating}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
