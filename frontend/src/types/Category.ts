export interface Category {
  id: string;
  title: string;
  description?: string;
  icon_name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
  transactionsCount?: number;
  transactionsBalance?: number;
}

export interface CreateCategoryInput {
  title: string;
  description: string;
  icon_name: string;
  color: string;
}

export interface UpdateCategoryInput {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color: string;
}
