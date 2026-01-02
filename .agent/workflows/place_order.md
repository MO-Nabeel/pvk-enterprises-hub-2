---
description: Steps to verify the Place Order workflow and data integrity
---

# Place Order Workflow

This workflow describes the process of placing an order and ensuring all customer details and order specifics are accurately captured and saved.

## Prerequisites

- [ ] Items added to Cart
- [ ] User is on `/checkout` page

## Steps

### 1. Customer Details Entry
Ensure the following fields are filled:
- **Full Name**: Required
- **Mobile Number**: Required (10 digits)
- **Email Address**: Required (Valid format)
- **Delivery Address**: Required (Full address)
- **Pincode**: Required (6 digits)
- **Fulfillment Method**: Selected (COD / Quote / Online)

### 2. Validation
- The "Place Order" button should be disabled if any required field is invalid.
- Click the button only when enabled.

### 3. Order Submission (Internal)
Upon clicking "Place Order":
1.  **Payload Construction**: System builds strict `OrderPayload` object.
    -   `customer` object must match `CustomerDetails` interface.
    -   `totals` must calculate correctly from cart.
2.  **Local Persistence**: 
    -   Order is **immediately** saved to Local Storage (`pvk_orders`).
    -   This ensures admin dashboard visibility even if network fails.
3.  **Communications**:
    -   System attempts to send Webhook/Email.
    -   Failures are logged but **do not block** success.

### 4. Success & Sharing
-   User sees **Success Dialog** with Order ID.
-   Cart is cleared.
-   "Share on WhatsApp" button generates a link with all formatted details.

## Verification

To verify this workflow manually:
1.  Open Admin Dashboard in a separate tab (`/admin/dashboard`).
2.  Complete checkout as a user.
3.  Verify Success Dialog appears.
4.  Refresh Admin Dashboard and confirm new order appears with correct customer name and total.
