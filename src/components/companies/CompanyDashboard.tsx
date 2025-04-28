
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
import { Star } from "lucide-react";

export function CompanyDashboard() {
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompaniesWithRatings
  });

  if (isLoading) {
    return <div className="p-8 text-center">Carregando empresas...</div>;
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Receita Anual Est.</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">{company.company_name}</TableCell>
              <TableCell>{company.sector}</TableCell>
              <TableCell>{company.estimated_annual_revenue}</TableCell>
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
                <span className={`px-2 py-1 rounded text-sm ${
                  company.rating?.approval_status === "Approved" 
                    ? "bg-green-500/20 text-green-500"
                    : company.rating?.approval_status === "Not Approved"
                    ? "bg-red-500/20 text-red-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}>
                  {company.rating?.approval_status || "Pendente"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <RatingDialog 
                  company={company}
                  existingRating={company.rating}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
