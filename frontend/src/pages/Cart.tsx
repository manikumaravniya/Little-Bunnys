import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderWhatsAppDialog from "@/components/OrderWhatsAppDialog";
import { CartItem, getCartItems, removeFromCart, updateCartQuantity } from "@/lib/cart";

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const refresh = () => setItems(getCartItems());

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("lb-cart-change", handler);
    return () => window.removeEventListener("lb-cart-change", handler);
  }, []);

  const orderItems = useMemo(
    () =>
      items.map((item) => ({
        dressCode: item.code,
        dressDescription: "",
        quantity: item.quantity,
      })),
    [items]
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_hsl(var(--background))_0%,_hsl(var(--secondary))_45%,_hsl(var(--background))_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Cart</p>
            <h1 className="text-3xl font-display font-bold text-foreground md:text-4xl">Your Dresses</h1>
          </div>
          {/* <Link className="text-sm font-semibold text-primary" to="/">
            Continue shopping
          </Link> */}
        </div>

        <Card className="border border-border/60 bg-background/90 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 && (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            )}
            {items.map((item) => (
              <div
                key={item.code}
                className="flex flex-col gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Code: {item.code}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateCartQuantity(item.code, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateCartQuantity(item.code, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <span className="text-xs text-muted-foreground">Qty</span>
                  </div>
                  <Button variant="outline" onClick={() => removeFromCart(item.code)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link to="/">
            <Button variant="outline" className="rounded-full px-6 py-3 font-semibold">
              Back
            </Button>
          </Link>
          <OrderWhatsAppDialog
            triggerLabel="Order via WhatsApp"
            triggerVariant="default"
            triggerClassName="rounded-full px-8 py-3 font-semibold"
            initialItems={orderItems}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
