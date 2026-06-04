import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod: 'alipay' | 'wechat';
  createdAt: string;
  paidAt?: string;
}

interface PaymentState {
  orders: Order[];
  processingOrder: Order | null;
  showPaymentModal: boolean;
  createOrder: (planId: string, planName: string, amount: number) => Order;
  processPayment: (method: 'alipay' | 'wechat') => void;
  completePayment: () => boolean;
  cancelPayment: () => void;
  closePaymentModal: () => void;
  getTotalRevenue: () => number;
  getOrderCount: () => number;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      orders: [],
      processingOrder: null,
      showPaymentModal: false,

      createOrder: (planId, planName, amount) => {
        const order: Order = {
          id: `ORD-${Date.now().toString(36).toUpperCase()}`,
          planId,
          planName,
          amount,
          status: 'pending',
          paymentMethod: 'alipay',
          createdAt: new Date().toISOString(),
        };
        set({ processingOrder: order, showPaymentModal: true });
        return order;
      },

      processPayment: (method) => {
        const order = get().processingOrder;
        if (!order) return;
        set({
          processingOrder: { ...order, paymentMethod: method },
        });
      },

      completePayment: () => {
        const order = get().processingOrder;
        if (!order) return false;
        const completed: Order = {
          ...order,
          status: 'paid',
          paidAt: new Date().toISOString(),
        };
        set({
          orders: [...get().orders, completed],
          processingOrder: null,
          showPaymentModal: false,
        });
        return true;
      },

      cancelPayment: () => {
        set({ processingOrder: null, showPaymentModal: false });
      },

      closePaymentModal: () => {
        set({ showPaymentModal: false });
      },

      getTotalRevenue: () => {
        return get().orders
          .filter((o) => o.status === 'paid')
          .reduce((sum, o) => sum + o.amount, 0);
      },

      getOrderCount: () => get().orders.filter((o) => o.status === 'paid').length,
    }),
    { name: 'nebula-fit-payments' }
  )
);
