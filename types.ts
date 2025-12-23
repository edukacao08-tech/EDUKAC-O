
export interface ShortLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  customSlug?: string;
  createdAt: string;
  clicks: number;
  tags: string[];
  title: string;
}

export interface ClickData {
  timestamp: string;
  device: 'mobile' | 'desktop' | 'tablet';
  location: string;
  referrer: string;
}

export interface LinkStats {
  totalClicks: number;
  clicksOverTime: { date: string; clicks: number }[];
  deviceDistribution: { name: string; value: number }[];
}

export interface AIInsight {
  title: string;
  description: string;
  type: 'optimization' | 'marketing' | 'safety';
}
