import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { Category } from "@/types";
import type { TransactionTypeFilter } from "@/types/Transaction";

import {
  getMonthOptions,
  type TransactionFilterState,
} from "./transaction.utils";

type TransactionFiltersProps = {
  filters: TransactionFilterState;
  categories: Category[];
  onChange: (changes: Partial<TransactionFilterState>) => void;
};

const TYPE_OPTIONS: {
  value: TransactionTypeFilter;
  label: string;
}[] = [
  {
    value: "all",
    label: "Todos",
  },
  {
    value: "expense",
    label: "Saídas",
  },
  {
    value: "income",
    label: "Entradas",
  },
];

const SELECT_CLASS_NAME =
  "h-12 w-full appearance-none rounded-md border " +
  "border-input bg-background px-3 pr-10 text-sm " +
  "text-foreground outline-none transition " +
  "focus:border-ring focus:ring-3 focus:ring-ring/30";

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
        <Field>
          <FieldLabel htmlFor="transaction-search">Buscar</FieldLabel>

          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4 text-gray-400" />
            </InputGroupAddon>

            <InputGroupInput
              id="transaction-search"
              value={search}
              placeholder="Buscar por descrição"
              onChange={(event) => setSearch(event.target.value)}
            />
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="transaction-type">Tipo</FieldLabel>

          <div className="relative">
            <select
              id="transaction-type"
              value={filters.type}
              className={SELECT_CLASS_NAME}
              onChange={(event) =>
                onChange({
                  type: event.target.value as TransactionTypeFilter,
                })
              }
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="transaction-category">Categoria</FieldLabel>

          <div className="relative">
            <select
              id="transaction-category"
              value={filters.categoryId}
              className={SELECT_CLASS_NAME}
              onChange={(event) =>
                onChange({
                  categoryId: event.target.value,
                })
              }
            >
              <option value="all">Todas</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="transaction-period">Período</FieldLabel>

          <div className="relative">
            <select
              id="transaction-period"
              value={filters.period}
              className={SELECT_CLASS_NAME}
              onChange={(event) =>
                onChange({
                  period: event.target.value,
                })
              }
            >
              {getMonthOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          </div>
        </Field>
      </div>
    </Card>
  );
}
