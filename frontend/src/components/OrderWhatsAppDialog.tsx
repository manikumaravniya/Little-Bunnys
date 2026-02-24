import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const dressOptions = [
  {
    code: "LB-001",
    name: "Sunset Orange Tie-Dye Dress",
    description:
      "Bright orange tie-dye dress with a soft flared skirt and cute button detailing on the bodice.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624347/dress-1_ohz1j4.png",
  },
  {
    code: "LB-002",
    name: "Maroon Royal Brocade Party Dress",
    description:
      "Elegant maroon satin bodice paired with a rich gold-woven brocade flared skirt.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624345/dress-2_wnlijh.png",
  },
  {
    code: "LB-003",
    name: "Royal Pink Peplum Ethnic Dress",
    description:
      "Bright pink embroidered peplum top paired with a flared navy brocade skirt.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624346/dress-3_mfaiqp.png",
  },
  {
    code: "LB-004",
    name: "Ruby Blossom Ethnic Peplum Dress",
    description:
      "Rich red embroidered peplum top paired with a flared grey skirt featuring a vibrant pink border.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624367/dress-4_qq6xra.png",
  },
  {
    code: "LB-005",
    name: "Emerald Festive Bloom",
    description: "Rich green embroidered bodice paired with a flared red brocade skirt.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624360/dress-5_fctggx.png",
  },
  {
    code: "LB-006",
    name: "Regal Maroon & Green Brocade Dress",
    description:
      "Elegant maroon embroidered bodice paired with a rich green brocade flared skirt.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624364/dress-6_h0c9r1.png",
  },
  {
    code: "LB-007",
    name: "Amber Leaf Organza Party Dress",
    description:
      "Warm amber-toned bodice paired with a flowy printed organza flared skirt.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624354/dress-7_pgtoyw.png",
  },
  {
    code: "LB-008",
    name: "Pink Bunny Wrap Cotton Dress",
    description:
      "Soft pink cotton dress with cute bunny prints, wrap-style bodice, and tassel tie-up detail.",
    image: "https://res.cloudinary.com/dlbjaesa9/image/upload/v1770624358/dress-8_yic4ql.png",
  },
];

type OrderWhatsAppDialogProps = {
  triggerLabel?: string;
  triggerClassName?: string;
  triggerVariant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  initialItems?: { dressCode: string; dressDescription?: string; quantity?: number }[];
};

const OrderWhatsAppDialog = ({
  triggerLabel = "Order via WhatsApp",
  triggerClassName,
  triggerVariant = "default",
  triggerSize = "default",
  initialItems,
}: OrderWhatsAppDialogProps) => {
  const whatsappNumber = "918328009865";
  const [isOpen, setIsOpen] = useState(false);
  const [activeCodeIndex, setActiveCodeIndex] = useState<number | null>(null);
  const fallbackItems = useMemo(
    () => initialItems?.length
      ? initialItems.map((item) => ({
          dressCode: item.dressCode,
          dressDescription: item.dressDescription || "",
          quantity: item.quantity || 1,
        }))
      : [{ dressCode: "", dressDescription: "", quantity: 1 }],
    [initialItems]
  );

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    items: fallbackItems,
    address: "",
  });
  const [error, setError] = useState<string | null>(null);

  const findDressByCode = (value: string) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return null;
    return dressOptions.find((option) => option.code.toLowerCase() === normalized) || null;
  };

  const getFilteredOptions = (dressCode: string) => {
    if (!dressCode.trim()) {
      return [];
    }

    const query = dressCode.trim().toLowerCase();
    return dressOptions.filter((option) =>
      option.code.toLowerCase().includes(query) ||
      option.name.toLowerCase().includes(query)
    );
  };

  const updateItem = (
    index: number,
    updates: { dressCode?: string; dressDescription?: string; quantity?: number }
  ) => {
    setForm((prev) => {
      const nextItems = prev.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...updates } : item
      );
      return { ...prev, items: nextItems };
    });
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { dressCode: "", dressDescription: "", quantity: 1 }],
    }));
  };
  useEffect(() => {
    if (!isOpen) return;
    setForm((prev) => ({
      ...prev,
      items: fallbackItems,
    }));
  }, [isOpen, fallbackItems]);

  const removeItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const hasEmptyItem = form.items.some(
      (item) => !item.dressCode || !item.dressDescription
    );

    if (!form.name || !form.mobile || !form.address || hasEmptyItem) {
      setError("Please fill out all fields.");
      return;
    }

    const messageParts = [
      "Order via WhatsApp",
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      "Items:",
    ];

    form.items.forEach((item, index) => {
      const matched = findDressByCode(item.dressCode);
      messageParts.push(
        `  ${index + 1}) Code: ${item.dressCode}${item.quantity ? ` (Qty ${item.quantity})` : ""}`
      );
      messageParts.push(`     Description: ${item.dressDescription}`);
      if (matched?.image) {
        messageParts.push(`     Image: ${matched.image}`);
      }
    });

    messageParts.push(`Address: ${form.address}`);
    const message = messageParts.join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={triggerClassName}
          variant={triggerVariant}
          size={triggerSize}
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order via WhatsApp</DialogTitle>
          <DialogDescription>
            Fill in the details and we will open WhatsApp with your order.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wa-name">Name</Label>
              <Input
                id="wa-name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wa-mobile">Mobile Number</Label>
              <Input
                id="wa-mobile"
                type="tel"
                value={form.mobile}
                onChange={(event) => setForm({ ...form, mobile: event.target.value })}
              />
            </div>
          </div>
          <div className="space-y-6">
            {form.items.map((item, index) => {
              const matches = getFilteredOptions(item.dressCode);
              const preview = findDressByCode(item.dressCode);

              return (
                <div
                  key={`item-${index}`}
                  className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Label className="text-sm font-semibold">Dress {index + 1}</Label>
                    {form.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`wa-code-${index}`}>Dress Code</Label>
                    <div className="relative">
                      <Input
                        id={`wa-code-${index}`}
                        value={item.dressCode}
                        onChange={(event) => {
                          updateItem(index, { dressCode: event.target.value });
                          setActiveCodeIndex(index);
                        }}
                        onFocus={() => setActiveCodeIndex(index)}
                        onBlur={() => setActiveCodeIndex(null)}
                        autoComplete="off"
                      />
                      {activeCodeIndex === index && matches.length > 0 && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 max-h-52 overflow-auto rounded-xl border border-border bg-background shadow-lg">
                          {matches.map((option) => (
                            <button
                              key={option.code}
                              type="button"
                              className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm text-foreground hover:bg-muted"
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => {
                                updateItem(index, { dressCode: option.code });
                                setActiveCodeIndex(null);
                              }}
                            >
                              <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                                <img
                                  src={option.image}
                                  alt={option.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  {option.code} - {option.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {option.description}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {preview && (
                      <div className="mt-3 flex items-center gap-3 rounded-xl border border-border/60 bg-muted/40 p-3">
                        <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={preview.image}
                            alt={preview.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {preview.code} - {preview.name}
                          </p>
                          <p className="text-xs text-muted-foreground">Preview for your description</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`wa-description-${index}`}>Dress Description</Label>
                    <Textarea
                      id={`wa-description-${index}`}
                      rows={3}
                      value={item.dressDescription}
                      onChange={(event) =>
                        updateItem(index, { dressDescription: event.target.value })
                      }
                    />
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`wa-qty-${index}`} className="text-xs text-muted-foreground">
                        Qty
                      </Label>
                      <Input
                        id={`wa-qty-${index}`}
                        type="number"
                        min={1}
                        className="w-20"
                        value={item.quantity || 1}
                        onChange={(event) =>
                          updateItem(index, { quantity: Number(event.target.value) || 1 })
                        }
                      />
                    </div>
                    <div className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-2 text-[10px] text-muted-foreground leading-snug">
                      <p className="font-semibold text-foreground leading-tight">Suggestions to add</p>
                      <p>Color, age, size, fabric, occasion, sleeve style, and any custom notes.</p>
                      <p>Example: "Pink frock, age 4-5, size 4-5, cotton, birthday party, puff sleeves."</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Button type="button" variant="outline" onClick={addItem}>
              Add another dress
            </Button>
          </div>
          <Alert className="px-2.5 py-2">
            <AlertTitle className="text-[11px] leading-tight">Important note</AlertTitle>
            <AlertDescription className="text-[10px] leading-snug">
              Exact same designs may not be available. We can provide close or similar styles based on
              your request. Preorder is necessary.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Label htmlFor="wa-address">Address</Label>
            <Textarea
              id="wa-address"
              rows={2}
              value={form.address}
              onChange={(event) => setForm({ ...form, address: event.target.value })}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit">Send via WhatsApp</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderWhatsAppDialog;
