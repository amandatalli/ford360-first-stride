
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateCompanyRating } from "@/services/company-ratings";
import type { Database } from "@/integrations/supabase/types";

type CompanyRating = Database["public"]["Tables"]["company_ratings"]["Row"];
type Company = Database["public"]["Tables"]["user_registrations"]["Row"];

interface RatingDialogProps {
  company: Company;
  existingRating?: CompanyRating;
}

export function RatingDialog({ company, existingRating }: RatingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(existingRating?.rating || 3);
  const [status, setStatus] = useState(existingRating?.approval_status || "Under Evaluation");
  const [justification, setJustification] = useState(existingRating?.justification || "");
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: () => updateCompanyRating(
      company.id,
      rating,
      status as "Approved" | "Under Evaluation" | "Not Approved",
      justification
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Avaliação atualizada com sucesso");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Erro ao atualizar avaliação");
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {existingRating ? "Editar Avaliação" : "Avaliar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Avaliar {company.company_name}</DialogTitle>
          <DialogDescription>
            Avalie a empresa considerando: Fit Estratégico (40%), 
            Valuation (30%), Risco (20%) e Crescimento (10%)
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Avaliação (1-5)</label>
            <Slider
              value={[rating]}
              onValueChange={(values) => setRating(values[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status de Aprovação</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Approved">Aprovado</SelectItem>
                <SelectItem value="Under Evaluation">Em Avaliação</SelectItem>
                <SelectItem value="Not Approved">Não Aprovado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Justificativa</label>
            <Textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explique sua avaliação..."
              className="h-20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !justification.trim()}
          >
            Salvar Avaliação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
