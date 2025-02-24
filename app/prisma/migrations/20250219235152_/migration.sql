/*
  Warnings:

  - Added the required column `password` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SellerProduct" (
    "id" UUID NOT NULL,
    "porcent" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "sellerId" UUID,
    "productId" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SellerProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SellerProduct" ADD CONSTRAINT "SellerProduct_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerProduct" ADD CONSTRAINT "SellerProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
