import { NextResponse } from "next/server"
import ExcelJS from "exceljs"
import connectToDatabase from "@/lib/mongodb"
import Order from "@/models/Order"

export async function GET() {
  try {
    // Connexion à la base de données
    await connectToDatabase()

    // Récupérer toutes les commandes
    const orders = await Order.find().sort({ createdAt: -1 })

    // Créer un nouveau classeur Excel
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Commandes")

    // Définir les en-têtes
    worksheet.columns = [
      { header: "ID Commande", key: "id", width: 20 },
      { header: "N° Facture", key: "invoiceNumber", width: 15 },
      { header: "Date", key: "createdAt", width: 20 },
      { header: "Nom", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Téléphone", key: "phone", width: 15 },
      { header: "Adresse", key: "address", width: 30 },
      { header: "Ville", key: "city", width: 15 },
      { header: "Code Postal", key: "postalCode", width: 10 },
      { header: "Pays", key: "country", width: 15 },
      { header: "Méthode de Paiement", key: "paymentMethod", width: 20 },
      { header: "Total", key: "total", width: 10 },
      { header: "Statut", key: "status", width: 15 },
    ]

    // Ajouter les données
    for (const order of orders) {
      worksheet.addRow({
        id: order._id.toString(),
        invoiceNumber: order.invoiceNumber,
        createdAt: new Date(order.createdAt).toLocaleString("fr-FR"),
        name: `${order.firstName} ${order.lastName}`,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        postalCode: order.postalCode,
        country: order.country,
        paymentMethod:
          order.paymentMethod === "cash"
            ? "À la livraison"
            : order.paymentMethod === "card"
              ? "Carte bancaire"
              : "PayPal",
        total: `${order.total} €`,
        status:
          order.status === "pending"
            ? "En attente de paiement"
            : order.status === "paid"
              ? "Payé"
              : order.status === "shipped"
                ? "Expédié"
                : order.status === "delivered"
                  ? "Livré"
                  : "Annulé",
      })
    }

    // Mettre en forme le tableau
    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD4AF37" }, // Couleur or
    }
    worksheet.getRow(1).font = { bold: true, color: { argb: "FF000000" } }

    // Générer le fichier Excel
    const buffer = await workbook.xlsx.writeBuffer()

    // Retourner le fichier Excel
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="commandes_${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la génération du fichier Excel:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la génération du fichier Excel" },
      { status: 500 },
    )
  }
}
