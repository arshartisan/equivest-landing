export interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
}

export type Sentiment = "up" | "down" | "flat";

export function sentimentOf(stock: Pick<Stock, "change">): Sentiment {
  if (stock.change > 0.001) return "up";
  if (stock.change < -0.001) return "down";
  return "flat";
}
