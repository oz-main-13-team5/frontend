export interface PillList {
  page: number;
  limit: number;
  total: number;
  pills: Pill[];
}

export interface Pill {
  item_seq: string;
  item_name: string;
  efcy_qesitm?: string;
  entp_name: string;
  item_image_url: string;
  is_marked?: boolean;
}

export interface PillDetail extends Pill {
  use_method_qesitm: string; //복용방법
  atpn_warn_qesitm: string; //복용 시 주의사항
  intrc_qesitm: string; //상호작용 정보 (다른 약, 술, 담배 등)
  se_qesitm: string; //부작용 정보
  deposit_method_qesitm: string; //보관 방법
}
