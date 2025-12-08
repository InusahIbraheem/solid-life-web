import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, X, FileImage } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface PaymentProofUploadProps {
  onUploadComplete: (url: string) => void;
  label?: string;
  existingUrl?: string;
}

export const PaymentProofUpload = ({ 
  onUploadComplete, 
  label = "Upload Payment Proof",
  existingUrl 
}: PaymentProofUploadProps) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or PDF file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    setFileName(file.name);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("payment-proofs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("payment-proofs")
        .getPublicUrl(filePath);

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview("pdf");
      }

      onUploadComplete(publicUrl);
      toast.success("Payment proof uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const clearUpload = () => {
    setPreview(null);
    setFileName("");
    onUploadComplete("");
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {!preview ? (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <Input
            type="file"
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="payment-proof-upload"
          />
          <label
            htmlFor="payment-proof-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            ) : (
              <Upload className="h-8 w-8 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">
              {uploading ? "Uploading..." : "Click to upload payment proof"}
            </span>
            <span className="text-xs text-muted-foreground">
              JPG, PNG, or PDF (max 5MB)
            </span>
          </label>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4 bg-muted/30">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearUpload}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            {preview === "pdf" ? (
              <FileImage className="h-12 w-12 text-primary" />
            ) : (
              <img
                src={preview}
                alt="Payment proof"
                className="h-16 w-16 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm font-medium text-success">
                <CheckCircle className="h-4 w-4" />
                Uploaded successfully
              </div>
              {fileName && (
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {fileName}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
