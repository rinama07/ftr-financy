import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import type { Category } from "@/types";
import { DropdownField } from "../forms/DropdownField";
import { TextField } from "../forms/TextField";
import {
  getCategoriesOptions,
  getMonthOptions,
  getTypeOptions,
  type TransactionFilterState,
} from "./transaction.utils";

type TransactionFiltersProps = {
  filters: TransactionFilterState;
  categories: Category[];
  onChange: (changes: Partial<TransactionFilterState>) => void;
};

export function TransactionFilters({
  filters,
  categories,
  onChange,
}: TransactionFiltersProps) {
  const [search, setSearch] = useState(filters.description);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onChange({
        description: search,
      });
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [search, onChange]);

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <TextField
          addon={<Search className="size-4 text-gray-400" />}
          id="transaction-search"
          label="Buscar"
          placeholder="Buscar por descrição"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <DropdownField
          id="transaction-type"
          label="Tipo"
          value={filters.type}
          options={getTypeOptions()}
          onChange={(type) =>
            onChange({
              type,
            })
          }
        />

        <DropdownField
          id="transaction-category"
          label="Categoria"
          value={filters.categoryId}
          options={getCategoriesOptions(categories)}
          onChange={(categoryId) =>
            onChange({
              categoryId,
            })
          }
        />

        <DropdownField
          id="transaction-period"
          label="Período"
          value={filters.period}
          options={getMonthOptions()}
          onChange={(period) =>
            onChange({
              period,
            })
          }
        />
      </div>
    </Card>
  );
}
