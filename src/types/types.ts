export type pillSearchOptionFrontend = "itemName" | "enterpriseName" | "efficacy";
export type pillSearchOptionBackend = "item_name" | "entp_name" | "efcy_qesitm";

export interface Toast {
  id: number;
  type: "success" | "error";
  title: string;
  content: string;
}
