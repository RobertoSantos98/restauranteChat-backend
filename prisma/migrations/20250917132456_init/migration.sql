-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cardapio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cardapio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Interacoes" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "cardapioId" INTEGER NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "idCardapio" INTEGER NOT NULL,

    CONSTRAINT "Prato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ingrediente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PratoIngredientes" (
    "pratoId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,

    CONSTRAINT "PratoIngredientes_pkey" PRIMARY KEY ("pratoId","ingredienteId")
);

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id" SERIAL NOT NULL,
    "numeroTelefone" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pedido" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opcional" TEXT,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ItemPedido" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "pratoId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "ItemPedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_numeroTelefone_key" ON "public"."Cliente"("numeroTelefone");

-- AddForeignKey
ALTER TABLE "public"."Interacoes" ADD CONSTRAINT "Interacoes_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Interacoes" ADD CONSTRAINT "Interacoes_cardapioId_fkey" FOREIGN KEY ("cardapioId") REFERENCES "public"."Cardapio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prato" ADD CONSTRAINT "Prato_idCardapio_fkey" FOREIGN KEY ("idCardapio") REFERENCES "public"."Cardapio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PratoIngredientes" ADD CONSTRAINT "PratoIngredientes_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "public"."Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PratoIngredientes" ADD CONSTRAINT "PratoIngredientes_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "public"."Ingrediente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItemPedido" ADD CONSTRAINT "ItemPedido_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "public"."Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItemPedido" ADD CONSTRAINT "ItemPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
