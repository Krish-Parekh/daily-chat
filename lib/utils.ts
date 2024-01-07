import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateFromTo(page: number, limit: number) {
  let from = page * limit;
  let to = from + limit;
  if (page > 0) {
    from = from + 1;
  }
  return { from, to };
}