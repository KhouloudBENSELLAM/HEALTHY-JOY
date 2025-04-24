import mongoose, { Schema } from "mongoose"

// Schéma pour les articles de la commande
const OrderItemSchema = new Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
})

// Schéma principal pour les commandes
const OrderSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "France",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "cash"],
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    items: [OrderItemSchema],
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: function () {
        return this.paymentMethod === "cash" ? "pending" : "paid"
      },
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  },
)

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement avec hot reload
export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
