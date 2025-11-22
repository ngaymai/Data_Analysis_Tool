import { AnalysisData, AnalysisPerformance } from './types';

export const PERFORMANCE_DATA: AnalysisPerformance = {
  metadata: {
    analysis_date: "2025-11-22 18:07:51",
    total_analysis_time: "75.17 seconds",
    database_path: "Data Output\\DuckDBDatabase\\olist_ecom.duckdb"
  },
  timing_statistics: {
    "1. Tổng quan kinh doanh": {
      time_seconds: 5.2567219734191895,
      percentage: "6.99%"
    },
    "2. Phân tích doanh thu": {
      time_seconds: 5.205738306045532,
      percentage: "6.92%"
    },
    "3. Phân tích khách hàng": {
      time_seconds: 21.07122802734375,
      percentage: "28.03%"
    },
    "4. Phân tích sản phẩm": {
      time_seconds: 14.60091519355774,
      percentage: "19.42%"
    },
    "5. Phân tích người bán": {
      time_seconds: 12.058090925216675,
      percentage: "16.04%"
    },
    "6. Phân tích thanh toán": {
      time_seconds: 4.1830713748931885,
      percentage: "5.56%"
    },
    "7. Phân tích đánh giá": {
      time_seconds: 8.307768106460571,
      percentage: "11.05%"
    },
    "8. Phân tích giao hàng": {
      time_seconds: 4.4505486488342285,
      percentage: "5.92%"
    }
  },
  output_directories: {
    json_output: "Data Output\\DA_Results\\JSON",
    csv_output: "Data Output\\DA_Results\\CSV"
  }
};

export const ANALYTICS_DATA: AnalysisData = {
  metadata: {
    export_date: "2025-11-22 18:07:51",
    database_path: "Data Output\\DuckDBDatabase\\olist_ecom.duckdb",
    description: "Tất cả dữ liệu phân tích Olist E-commerce Business Analysis"
  },
  analyses: {
    business_overview: [
      {
        total_orders: 7718240,
        total_customers: 7718240,
        total_products: 2577280,
        total_sellers: 237600,
        total_revenue: 1233581900.000321,
        avg_order_value: 139.92916095723123,
        active_days: 612
      }
    ],
    order_status: [
      { order_status: "delivered", count: 7718240, percentage: 97.02 },
      { order_status: "shipped", count: 88560, percentage: 1.11 },
      { order_status: "canceled", count: 50000, percentage: 0.62 },
      { order_status: "unavailable", count: 48720, percentage: 0.61 },
      { order_status: "invoiced", count: 25120, percentage: 0.31 },
      { order_status: "processing", count: 24080, percentage: 0.30 },
      { order_status: "created", count: 400, percentage: 0.005 },
      { order_status: "approved", count: 160, percentage: 0.002 }
    ],
    monthly_revenue_top10: [
      { month: "2024-11", orders: 583120, revenue: 92269135.99 },
      { month: "2025-04", orders: 543840, revenue: 90630314.40 },
      { month: "2025-05", orders: 539920, revenue: 90301961.60 },
      { month: "2025-03", orders: 560240, revenue: 89647859.19 },
      { month: "2025-01", orders: 565520, revenue: 86230996.79 },
      { month: "2025-07", orders: 492720, revenue: 82224582.40 },
      { month: "2025-06", orders: 487920, revenue: 80958263.20 },
      { month: "2025-08", orders: 508080, revenue: 78839331.20 },
      { month: "2025-02", orders: 524400, revenue: 77293472.79 },
      { month: "2024-12", orders: 441040, revenue: 67446263.19 }
    ],
    revenue_monthly: [
      { month: "2024-09", total_orders: 332000, product_revenue: 48591973, shipping_revenue: 7494225, total_revenue: 56086199, avg_order_value: 148 },
      { month: "2024-10", total_orders: 358240, product_revenue: 51859812, shipping_revenue: 8229548, total_revenue: 60089360, avg_order_value: 144 },
      { month: "2024-11", total_orders: 583120, product_revenue: 79021229, shipping_revenue: 13247906, total_revenue: 92269135, avg_order_value: 136 },
      { month: "2024-12", total_orders: 441040, product_revenue: 58082655, shipping_revenue: 9363607, total_revenue: 67446263, avg_order_value: 136 },
      { month: "2025-01", total_orders: 565520, product_revenue: 73971600, shipping_revenue: 12259396, total_revenue: 86230996, avg_order_value: 134 },
      { month: "2025-02", total_orders: 524400, product_revenue: 66114970, shipping_revenue: 11178502, total_revenue: 77293472, avg_order_value: 128 },
      { month: "2025-03", total_orders: 560240, product_revenue: 76268500, shipping_revenue: 13379359, total_revenue: 89647859, avg_order_value: 139 },
      { month: "2025-04", total_orders: 543840, product_revenue: 77882727, shipping_revenue: 12747587, total_revenue: 90630314, avg_order_value: 144 },
      { month: "2025-05", total_orders: 539920, product_revenue: 78203575, shipping_revenue: 12098386, total_revenue: 90301961, avg_order_value: 144 },
      { month: "2025-06", total_orders: 487920, product_revenue: 68486228, shipping_revenue: 12472034, total_revenue: 80958263, avg_order_value: 144 },
      { month: "2025-07", total_orders: 492720, product_revenue: 69436276, shipping_revenue: 12788305, total_revenue: 82224582, avg_order_value: 147 },
      { month: "2025-08", total_orders: 508080, product_revenue: 67086131, shipping_revenue: 11753200, total_revenue: 78839331, avg_order_value: 137 }
    ],
    revenue_by_category: [
      { category: "health_beauty", orders: 691760, items_sold: 757200, revenue: 98650537, avg_price: 130 },
      { category: "watches_gifts", orders: 439600, items_sold: 468720, revenue: 93294158, avg_price: 199 },
      { category: "bed_bath_table", orders: 741760, items_sold: 876240, revenue: 81874780, avg_price: 93 },
      { category: "sports_leisure", orders: 602400, items_sold: 674480, revenue: 76388204, avg_price: 113 },
      { category: "computers_acc", orders: 522400, items_sold: 611520, revenue: 71097968, avg_price: 116 },
      { category: "furniture_decor", orders: 504560, items_sold: 652800, revenue: 56954215, avg_price: 87 },
      { category: "housewares", orders: 459440, items_sold: 543600, revenue: 49250295, avg_price: 90 },
      { category: "cool_stuff", orders: 284720, items_sold: 297440, revenue: 48816328, avg_price: 164 },
      { category: "auto", orders: 304800, items_sold: 331200, revenue: 46317331, avg_price: 139 },
      { category: "toys", orders: 304320, items_sold: 322400, revenue: 37702918, avg_price: 116 }
    ],
    customer_vip: [
      { customer_id: "ea743...", customer_city: "rio de janeiro", customer_state: "RJ", total_orders: 1, total_spent: 13664.08, avg_order_value: 1708.01 },
      { customer_id: "020bb...", customer_city: "rio de janeiro", customer_state: "RJ", total_orders: 1, total_spent: 13664.08, avg_order_value: 1708.01 },
      { customer_id: "dc437...", customer_city: "rio de janeiro", customer_state: "RJ", total_orders: 1, total_spent: 13664.08, avg_order_value: 1708.01 },
      { customer_id: "0ed9d...", customer_city: "rio de janeiro", customer_state: "RJ", total_orders: 1, total_spent: 13664.08, avg_order_value: 1708.01 },
      { customer_id: "b9423...", customer_city: "rio de janeiro", customer_state: "RJ", total_orders: 1, total_spent: 13664.08, avg_order_value: 1708.01 }
    ],
    customer_by_city: [
      { customer_state: "SP", customer_city: "sao paulo", customer_count: 1203600, order_count: 1203600, total_revenue: 168636813 },
      { customer_state: "RJ", customer_city: "rio de janeiro", customer_count: 528080, order_count: 528080, total_revenue: 88938576 },
      { customer_state: "MG", customer_city: "belo horizonte", customer_count: 215760, order_count: 215760, total_revenue: 32476040 },
      { customer_state: "DF", customer_city: "brasilia", customer_count: 165680, order_count: 165680, total_revenue: 27615923 },
      { customer_state: "PR", customer_city: "curitiba", customer_count: 119120, order_count: 119120, total_revenue: 19076777 }
    ],
    product_top_selling: [
      { product_id: "86ccfda...", product_category_name_english: "furniture_decor", orders: 425, quantity_sold: 520, total_revenue: 37104.30, avg_price: 71.35, avg_review_score: 4.05 },
      { product_id: "46490ac...", product_category_name_english: "furniture_decor", orders: 425, quantity_sold: 520, total_revenue: 37104.30, avg_price: 71.35, avg_review_score: 4.05 },
      { product_id: "fc427c5...", product_category_name_english: "furniture_decor", orders: 425, quantity_sold: 520, total_revenue: 37104.30, avg_price: 71.35, avg_review_score: 4.05 },
      { product_id: "2627595...", product_category_name_english: "furniture_decor", orders: 425, quantity_sold: 520, total_revenue: 37104.30, avg_price: 71.35, avg_review_score: 4.05 },
      { product_id: "7aec8d6...", product_category_name_english: "furniture_decor", orders: 425, quantity_sold: 520, total_revenue: 37104.30, avg_price: 71.35, avg_review_score: 4.05 }
    ],
    payment_methods: [
      { payment_type: "credit_card", order_count: 5944320, payment_count: 5966880, total_amount: 968087590, avg_payment: 162, usage_percentage: 74.02 },
      { payment_type: "boleto", order_count: 1535280, payment_count: 1535280, total_amount: 221594606, avg_payment: 144, usage_percentage: 19.05 },
      { payment_type: "voucher", order_count: 294320, payment_count: 439440, total_amount: 27441055, avg_payment: 62, usage_percentage: 5.45 },
      { payment_type: "debit_card", order_count: 118800, payment_count: 118880, total_amount: 16673689, avg_payment: 140, usage_percentage: 1.47 }
    ],
    review_scores: [
      { review_score: 5, review_count: 4565280, percentage: 59.22 },
      { review_score: 4, review_count: 1518960, percentage: 19.70 },
      { review_score: 3, review_count: 636880, percentage: 8.26 },
      { review_score: 2, review_count: 235280, percentage: 3.05 },
      { review_score: 1, review_count: 752480, percentage: 9.76 }
    ],
    delivery_by_state: [
      { customer_state: "SP", order_count: 3239520, avg_delivery_days: 8.7 },
      { customer_state: "PR", order_count: 393840, avg_delivery_days: 11.9 },
      { customer_state: "MG", order_count: 908320, avg_delivery_days: 11.9 },
      { customer_state: "DF", order_count: 166400, avg_delivery_days: 12.9 },
      { customer_state: "SC", order_count: 283680, avg_delivery_days: 14.9 }
    ]
  }
};