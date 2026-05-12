"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string; // <-- 1. Diubah menjadi tipe string tunggal
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {

  return (
    <div>
      {/* Area Preview Gambar */}
      <div className="mb-4 flex items-center gap-4">
        {/* 2. Hanya menampilkan preview jika variabel 'value' ada isinya */}
        {value && (
          <div className="relative w-50 h-50 rounded-md overflow-hidden border">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(value)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={value} />
          </div>
        )}
      </div>

      {/* Tombol Upload Widget */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{ maxFiles: 1 }}
        onSuccess={(result) => {
          // Pastikan event-nya sukses dan secure_url tersedia
          if (result.event === "success" && typeof result.info === "object" && result.info.secure_url) {
            onChange(result.info.secure_url);
          }
        }}
      >
        {({ open }) => {
          const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              {/* Ubah teks tombol jika gambar sudah ada */}
              {value ? "Ganti Gambar Produk" : "Upload Gambar Produk"}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}