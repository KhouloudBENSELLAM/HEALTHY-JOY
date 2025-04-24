import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Order from "@/models/Order"

export async function POST(request) {
  try {
    // Connexion à la base de données
    await connectToDatabase()

    const data = await request.json()

    // Créer une nouvelle commande dans MongoDB
    const order = new Order(data)
    await order.save()

    return NextResponse.json({
      success: true,
      message: "Commande enregistrée avec succès",
      orderId: order._id,
    })
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la commande:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'enregistrement de la commande" },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Connexion à la base de données
    await connectToDatabase()

    // Récupérer toutes les commandes, triées par date de création (les plus récentes d'abord)
    const orders = await Order.find().sort({ createdAt: -1 })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des commandes" },
      { status: 500 },
    )
  }
}
