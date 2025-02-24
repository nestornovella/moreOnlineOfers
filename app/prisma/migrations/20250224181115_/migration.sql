/*
  Warnings:

  - A unique constraint covering the columns `[sellerId,productId]` on the table `SellerProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SellerProduct_sellerId_productId_key" ON "SellerProduct"("sellerId", "productId");
