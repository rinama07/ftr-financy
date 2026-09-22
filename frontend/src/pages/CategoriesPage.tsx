import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Plus, Tag, Utensils } from "lucide-react";

export function CategoriesPage() {
  const highlightIconClassName = "w-8 h-8";
  const highlightCardClassName = "flex flex-row items-start gap-4 p-6";
  const highlightValueClassName = "font-bold text-gray-800 text-2xl";
  const highlightLabelClassName = "font-medium text-xs text-gray-500 uppercase";

  const items = [
    { id: "1", title: "Alimentação", icon_name: "", color: "", items: 0 },
    { id: "2", title: "Entretenimento", icon_name: "", color: "", items: 0 },
    { id: "3", title: "Investimento", icon_name: "", color: "", items: 0 },
    { id: "4", title: "Mercado", icon_name: "", color: "", items: 0 },
    { id: "5", title: "Salário", icon_name: "", color: "", items: 0 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-end justify-between gap-4">
        <p className="flex-1">
          <h1 className="font-bold text-2xl text-gray-800">Categorias</h1>
          <span className="text-gray-600 ">
            Organize suas transações por categorias
          </span>
        </p>

        <PrimaryButton size="sm" className="w-auto">
          <Plus />
          <span>Nova categoria</span>
        </PrimaryButton>
      </div>

      <div className="flex flex-row justify-center gap-6">
        <Card className={highlightCardClassName}>
          <Tag className={highlightIconClassName} />
          <div>
            <span className={highlightValueClassName}>8</span>
            <h2 className={highlightLabelClassName}>Total de categorias</h2>
          </div>
        </Card>

        <Card className={highlightCardClassName}>
          <ArrowUpDown className={highlightIconClassName} />
          <div>
            <span className={highlightValueClassName}>27</span>
            <h2 className={highlightLabelClassName}>Total de transações</h2>
          </div>
        </Card>

        <Card className={highlightCardClassName}>
          <Utensils className={highlightIconClassName} />
          <div>
            <span className={highlightValueClassName}>Alimentação</span>
            <h2 className={highlightLabelClassName}>
              Categoria mais utilizada
            </h2>
          </div>
        </Card>
      </div>

      <ul className="flex flex-row gap-4">
        {items.map((item) => (
          <li key={item.id} className="">
            <Card>
              <span>{item.title}</span>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
