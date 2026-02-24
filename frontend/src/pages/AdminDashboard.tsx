import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import {
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  getProducts,
  updateProduct as updateProductRequest,
} from "@/lib/api";
import { clearAdminToken } from "@/lib/admin-auth";
import type { Product } from "@/types/product";
import type { ProductInput } from "@/types/product";

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [actionError, setActionError] = useState("");

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const sortedProducts = useMemo(
    () => [...(productsQuery.data || [])].sort((a, b) => a.title.localeCompare(b.title)),
    [productsQuery.data]
  );

  const createMutation = useMutation({
    mutationFn: createProductRequest,
    onSuccess: async () => {
      setIsAddOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setActionError(error instanceof Error ? error.message : "Failed to add product.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, payload }: { productId: string; payload: ProductInput }) =>
      updateProductRequest(productId, payload),
    onSuccess: async () => {
      setEditingProduct(null);
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setActionError(error instanceof Error ? error.message : "Failed to update product.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setActionError(error instanceof Error ? error.message : "Failed to delete product.");
    },
  });

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin/login");
  };

  const handleDelete = async (productId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(productId);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage all products from one place.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { setActionError(""); setIsAddOpen(true); }}>Add New Product</Button>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        {actionError ? <p className="text-sm text-destructive">{actionError}</p> : null}

        {productsQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading products...</p>
        ) : productsQuery.isError ? (
          <p className="text-sm text-destructive">
            {productsQuery.error instanceof Error ? productsQuery.error.message : "Failed to load products."}
          </p>
        ) : (
          <div className="grid gap-4">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="border-border/60">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-24 w-24 rounded-md object-cover"
                      />
                      <div className="space-y-1">
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-sm font-medium">₹{product.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Code: {product.code}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setActionError("");
                          setEditingProduct(product);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => void handleDelete(product.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {!sortedProducts.length ? (
              <p className="text-sm text-muted-foreground">No products yet. Add your first product.</p>
            ) : null}
          </div>
        )}
      </div>

      <ProductFormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        mode="add"
        onSubmit={async (values) => {
          setActionError("");
          await createMutation.mutateAsync(values);
        }}
        isSubmitting={createMutation.isPending}
      />

      <ProductFormDialog
        open={Boolean(editingProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
          }
        }}
        mode="edit"
        product={editingProduct}
        onSubmit={async (values) => {
          if (!editingProduct) {
            return;
          }

          setActionError("");
          await updateMutation.mutateAsync({ productId: editingProduct.id, payload: values });
        }}
        isSubmitting={updateMutation.isPending}
      />
    </div>
  );
};

export default AdminDashboard;
