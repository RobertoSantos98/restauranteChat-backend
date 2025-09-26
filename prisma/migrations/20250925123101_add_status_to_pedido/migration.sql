-- CreateEnum
CREATE TYPE "public"."StatusPedido" AS ENUM ('PENDENTE', 'EM_PREPARACAO', 'SAIU_ENTREGAR', 'ENTREGUE', 'CANCELADO');

-- AlterTable
ALTER TABLE "public"."Pedido" ADD COLUMN     "status" "public"."StatusPedido" NOT NULL DEFAULT 'PENDENTE';
