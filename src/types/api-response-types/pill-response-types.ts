export interface PillList {
  page: number;
  limit: number;
  total: number;
  pills: Pill[];
}

export interface Pill {
  item_seq: string;
  item_name: string;
  efcy_qesitm: string;
  entp_name: string;
  item_image_url: string;
  is_marked: boolean;
}
