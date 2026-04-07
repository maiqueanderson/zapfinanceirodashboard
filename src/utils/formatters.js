import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatCurrency = (value) => {
  if (value === undefined || value === null) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return format(date, "dd 'de' MMM, yyyy", { locale: ptBR });
};

export const parseNumber = (val) => {
  const number = Number(val);
  return isNaN(number) ? 0 : number;
};
