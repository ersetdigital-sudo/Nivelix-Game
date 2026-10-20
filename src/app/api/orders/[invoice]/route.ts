import type { Order } from "@/lib/orders";
import { findOrder } from "@/lib/orders";

/**
 * API status pesanan.
 * TODO: ganti `findOrder` dengan query ke database/partner saat backend siap.
 */
export async function GET(
  _request: Request,
  context: RouteContext<"/api/orders/[invoice]">,
) {
  const { invoice } = await context.params;
  const order: Order | null = await findOrder(invoice);

  if (!order) {
    return Response.json(
      { message: "Invoice tidak ditemukan" },
      { status: 404 },
    );
  }

  return Response.json(order);
}
