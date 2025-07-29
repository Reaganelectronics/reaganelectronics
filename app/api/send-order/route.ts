import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const emailContent = `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
    <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🚨 NEW ORDER RECEIVED</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Reagan Electronics Auction</p>
      </div>

      <!-- Order Summary Box -->
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px;">
        <h2 style="color: #92400e; margin-top: 0; font-size: 20px;">⚡ URGENT ACTION REQUIRED</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
          <div>
            <strong style="color: #92400e;">Order #:</strong> ${orderData.orderNumber}<br>
            <strong style="color: #92400e;">Total:</strong> $${orderData.totalAmount.toFixed(2)}<br>
            <strong style="color: #92400e;">Items:</strong> ${orderData.items.reduce((sum: number, item: any) => sum + item.quantity, 0)}
          </div>
          <div>
            <strong style="color: #92400e;">Payment:</strong> ${orderData.paymentMethod}<br>
            <strong style="color: #92400e;">Shipping:</strong> ${orderData.shippingType.name}<br>
            <strong style="color: #92400e;">Date:</strong> ${new Date(orderData.timestamp).toLocaleDateString()}
          </div>
        </div>
      </div>

      <!-- Customer Information -->
      <div style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">👤 Customer Information</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
          <div>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${orderData.customerInfo.email}" style="color: #2563eb;">${orderData.customerInfo.email}</a></p>
          </div>
          <div>
            <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${orderData.customerInfo.phone}" style="color: #2563eb;">${orderData.customerInfo.phone}</a></p>
            <p style="margin: 5px 0;"><strong>Country:</strong> ${orderData.customerInfo.country}</p>
          </div>
        </div>
      </div>

      <!-- Shipping Address -->
      <div style="padding: 20px; border-bottom: 1px solid #e5e7eb;">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">📦 Shipping Address</h2>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 15px;">
          <p style="margin: 0; line-height: 1.6;">
            ${orderData.shippingInfo.address}<br>
            ${orderData.shippingInfo.city}, ${orderData.shippingInfo.state} ${orderData.shippingInfo.zipCode}<br>
            ${orderData.shippingInfo.country}
          </p>
        </div>
      </div>

      <!-- Order Items with Full Details -->
      <div style="padding: 20px;">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">🛍️ Order Items - Complete Details</h2>
        
        ${orderData.items
          .map(
            (item: any, index: number) => `
          <div style="border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0; background-color: #fafafa;">
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px; align-items: start;">
              
              <!-- Product Image -->
              <div style="text-align: center;">
                <img src="${item.image || "/placeholder.svg"}" alt="${item.name}" style="max-width: 150px; height: auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              </div>
              
              <!-- Product Details -->
              <div>
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">${index + 1}. ${item.name}</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                  <div>
                    <strong style="color: #374151;">Category:</strong> ${item.category}<br>
                    ${item.series ? `<strong style="color: #374151;">Series:</strong> ${item.series}<br>` : ""}
                    <strong style="color: #374151;">Selected Color:</strong> <span style="background-color: #dbeafe; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${item.selectedColor || "Default"}</span><br>
                    <strong style="color: #374151;">Quantity:</strong> <span style="background-color: #fef3c7; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${item.quantity}</span>
                  </div>
                  <div>
                    <strong style="color: #374151;">Original Price:</strong> <span style="text-decoration: line-through; color: #9ca3af;">$${item.originalPrice.toFixed(2)}</span><br>
                    <strong style="color: #374151;">Discounted Price:</strong> <span style="color: #059669; font-weight: bold;">$${item.discountedPrice.toFixed(2)}</span><br>
                    <strong style="color: #374151;">Discount:</strong> <span style="background-color: #fecaca; color: #dc2626; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${item.discount}% OFF</span><br>
                    <strong style="color: #374151;">Line Total:</strong> <span style="color: #059669; font-weight: bold; font-size: 16px;">$${(item.discountedPrice * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                
                <!-- Product Description -->
                <div style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                  <strong style="color: #374151;">Description:</strong><br>
                  <span style="color: #6b7280; font-style: italic;">${item.description}</span>
                </div>
                
                <!-- Product Features -->
                ${
                  item.features && item.features.length > 0
                    ? `
                <div>
                  <strong style="color: #374151;">Key Features:</strong>
                  <ul style="margin: 5px 0; padding-left: 20px; color: #6b7280;">
                    ${item.features.map((feature: string) => `<li>${feature}</li>`).join("")}
                  </ul>
                </div>
                `
                    : ""
                }
                
                <!-- Available Colors -->
                ${
                  item.colors && item.colors.length > 0
                    ? `
                <div style="margin-top: 10px;">
                  <strong style="color: #374151;">Available Colors:</strong>
                  <div style="margin-top: 5px;">
                    ${item.colors
                      .map(
                        (color: string) => `
                      <span style="display: inline-block; background-color: ${color === item.selectedColor ? "#dbeafe" : "#f3f4f6"}; 
                                   border: ${color === item.selectedColor ? "2px solid #3b82f6" : "1px solid #d1d5db"}; 
                                   padding: 4px 8px; margin: 2px; border-radius: 4px; font-size: 12px;
                                   font-weight: ${color === item.selectedColor ? "bold" : "normal"};">
                        ${color} ${color === item.selectedColor ? "✓" : ""}
                      </span>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
                `
                    : ""
                }
                
                <!-- Stock Status -->
                <div style="margin-top: 10px;">
                  <strong style="color: #374151;">Stock Status:</strong> 
                  <span style="background-color: ${item.inStock ? "#dcfce7" : "#fecaca"}; 
                               color: ${item.inStock ? "#166534" : "#dc2626"}; 
                               padding: 2px 8px; border-radius: 4px; font-weight: bold;">
                    ${item.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
        
        <!-- Order Totals -->
        <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 6px; border: 2px solid #e5e7eb;">
          <h3 style="margin-top: 0; color: #1f2937;">💰 Order Summary</h3>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-weight: 500;">Subtotal:</span>
            <span>$${orderData.subtotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-weight: 500;">Shipping (${orderData.shippingType.name} - ${orderData.shippingType.time}):</span>
            <span>$${orderData.shippingCost.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold; color: #059669; border-top: 2px solid #e5e7eb; padding-top: 10px;">
            <span>TOTAL AMOUNT:</span>
            <span>$${orderData.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <!-- Action Items -->
      <div style="background-color: #dc2626; color: white; padding: 25px; text-align: center;">
        <h3 style="margin-top: 0; font-size: 22px;">🔥 IMMEDIATE ACTION REQUIRED</h3>
        <div style="background-color: rgba(255,255,255,0.1); padding: 20px; border-radius: 6px; margin: 15px 0;">
          <p style="margin: 0; font-size: 16px; line-height: 1.6;">
            <strong>1.</strong> Contact customer immediately: <a href="tel:${orderData.customerInfo.phone}" style="color: #fbbf24;">${orderData.customerInfo.phone}</a><br>
            <strong>2.</strong> Process payment via ${orderData.paymentMethod}<br>
            <strong>3.</strong> Arrange ${orderData.shippingType.name} shipping (${orderData.shippingType.time})<br>
            <strong>4.</strong> Send tracking information once shipped<br>
            <strong>5.</strong> Verify product colors and availability before processing
          </p>
        </div>
        <p style="margin: 0; font-size: 14px; opacity: 0.9;">
          Order received: ${new Date(orderData.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  </div>
`

    const data = await resend.emails.send({
      from: "Reagan Electronics <orders@reaganelectronics.com>",
      to: ["rdiscountelectronic@gmail.com"],
      subject: `🚨 URGENT: New Order #${orderData.orderNumber} - $${orderData.totalAmount.toFixed(2)} - ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName} - ${orderData.paymentMethod}`,
      html: emailContent,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error sending order email:", error)
    return NextResponse.json({ error: "Failed to send order email" }, { status: 500 })
  }
}
