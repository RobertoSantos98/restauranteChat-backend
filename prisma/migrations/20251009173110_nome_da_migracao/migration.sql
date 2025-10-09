/*
  Warnings:

  - Added the required column `quantidade` to the `Ingrediente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Ingrediente" ADD COLUMN     "quantidade" DOUBLE PRECISION NOT NULL;
