export interface BusinessOverview {
  total_orders: number;
  total_customers: number;
  total_products: number;
  total_sellers: number;
  total_revenue: number;
  avg_order_value: number;
  active_days: number;
}

export interface OrderStatus {
  order_status: string;
  count: number;
  percentage: number;
}

export interface MonthlyRevenue {
  month: string;
  orders: number;
  revenue: number;
}

export interface RevenueMonthlyDetail {
  month: string;
  total_orders: number;
  product_revenue: number;
  shipping_revenue: number;
  total_revenue: number;
  avg_order_value: number;
}

export interface CategoryRevenue {
  category: string;
  orders: number;
  items_sold: number;
  revenue: number;
  avg_price: number;
}

export interface CustomerVIP {
  customer_id: string;
  customer_city: string;
  customer_state: string;
  total_orders: number;
  total_spent: number;
  avg_order_value: number;
}

export interface CustomerCity {
  customer_state: string;
  customer_city: string;
  customer_count: number;
  order_count: number;
  total_revenue: number;
}

export interface TopProduct {
  product_id: string;
  product_category_name_english: string;
  orders: number;
  quantity_sold: number;
  total_revenue: number;
  avg_price: number;
  avg_review_score: number;
}

export interface PaymentMethod {
  payment_type: string;
  order_count: number;
  payment_count: number;
  total_amount: number;
  avg_payment: number;
  usage_percentage: number;
}

export interface ReviewScore {
  review_score: number;
  review_count: number;
  percentage: number;
}

export interface DeliveryByState {
  customer_state: string;
  order_count: number;
  avg_delivery_days: number;
}

export interface TimingStatistic {
  time_seconds: number;
  percentage: string;
}

export interface AnalysisPerformance {
  metadata: {
    analysis_date: string;
    total_analysis_time: string;
    database_path: string;
  };
  timing_statistics: Record<string, TimingStatistic>;
  output_directories: {
    json_output: string;
    csv_output: string;
  };
}

export interface AnalysisData {
  metadata: {
    export_date: string;
    database_path: string;
    description: string;
  };
  analyses: {
    business_overview: BusinessOverview[];
    order_status: OrderStatus[];
    monthly_revenue_top10: MonthlyRevenue[];
    revenue_monthly: RevenueMonthlyDetail[];
    revenue_by_category: CategoryRevenue[];
    customer_vip: CustomerVIP[];
    customer_by_city: CustomerCity[];
    product_top_selling: TopProduct[];
    payment_methods: PaymentMethod[];
    review_scores: ReviewScore[];
    delivery_by_state: DeliveryByState[];
  };
}