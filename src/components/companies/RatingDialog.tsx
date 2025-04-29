
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
import { Label } from "@/components/ui/label";
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
  const [status, setStatus] = useState<string>(existingRating?.approval_status || "Under Evaluation");
  const [justification, setJustification] = useState(existingRating?.justification || "");
  
  // Weight factors
  const [strategicFitWeight, setStrategicFitWeight] = useState<number>(
    existingRating?.strategic_fit_weight || 0.4
  );
  const [valuationWeight, setValuationWeight] = useState<number>(
    existingRating?.valuation_weight || 0.3
  );
  const [riskWeight, setRiskWeight] = useState<number>(
    existingRating?.risk_weight || 0.2
  );
  const [growthWeight, setGrowthWeight] = useState<number>(
    existingRating?.growth_weight || 0.1
  );
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: () => updateCompanyRating(
      company.id,
      rating,
      status as "Approved" | "Under Evaluation" | "Not Approved",
      justification,
      strategicFitWeight,
      valuationWeight,
      riskWeight,
      growthWeight
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Avaliação atualizada com sucesso");
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Error updating rating:", error);
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
            Avalie a empresa considerando os fatores abaixo usando os pesos recomendados.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Avaliação (1-5)</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fit Estratégico (40%)</Label>
              <Slider
                value={[strategicFitWeight * 100]}
                onValueChange={(values) => setStrategicFitWeight(values[0] / 100)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-right text-muted-foreground">
                {Math.round(strategicFitWeight * 100)}%
              </div>
            </div>

            <div className="space-y-2">
              <Label>Valuation (30%)</Label>
              <Slider
                value={[valuationWeight * 100]}
                onValueChange={(values) => setValuationWeight(values[0] / 100)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-right text-muted-foreground">
                {Math.round(valuationWeight * 100)}%
              </div>
            </div>

            <div className="space-y-2">
              <Label>Risco (20%)</Label>
              <Slider
                value={[riskWeight * 100]}
                onValueChange={(values) => setRiskWeight(values[0] / 100)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-right text-muted-foreground">
                {Math.round(riskWeight * 100)}%
              </div>
            </div>

            <div className="space-y-2">
              <Label>Crescimento (10%)</Label>
              <Slider
                value={[growthWeight * 100]}
                onValueChange={(values) => setGrowthWeight(values[0] / 100)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-right text-muted-foreground">
                {Math.round(growthWeight * 100)}%
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status de Aprovação</Label>
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
            <Label>Justificativa</Label>
            <Textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explique sua avaliação, considerando potencial de crescimento, fit estratégico com a tese, e fatores de risco..."
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
