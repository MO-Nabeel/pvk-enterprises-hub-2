---
description: Steps to set up permanent email or admin notifications using webhooks
---

# Setup Permanent Order Notifications

Since WhatsApp sharing is temporary, you can set up automatic email or admin notifications using Webhooks. This allows orders to be sent to your email, CRM, or Slack automatically.

## Prerequisites

- [ ] Access to project `.env` file
- [ ] Account on an automation platform (e.g., [Make.com](https://make.com), [Zapier](https://zapier.com)) OR a backend server endpoint.

## Steps

### 1. Create a Webhook Endpoint
1.  Go to **Make.com** (recommended for free tier) or Zapier.
2.  Create a new Scenario/Zap.
3.  Add a **Webhook** trigger ("Custom Webhook").
4.  Copy the generated **Webhook URL** (e.g., `https://hook.us1.make.com/xyz...`).

### 2. Configure Environment Variable
1.  Open your project's `.env` file (or `.env.local`).
2.  Add or update the following line:
    ```env
    VITE_EMAIL_WEBHOOK=your_copied_webhook_url_here
    ```
    *(You can also use `VITE_ADMIN_WEBHOOK` for a separate channel)*.

### 3. Test the Setup
1.  Restart your development server (`npm run dev`) to load the new env var.
2.  Place a test order.
3.  Check your Make/Zapier dashboard. You should see the data arrive instantly.
4.  **Action**: detailed inside Make/Zapier, add an "Email (Send Email)" step to email `payload.customer.email` or yourself.

## How it Works
The code in `src/lib/orderSubmission.ts` automatically checks for `VITE_EMAIL_WEBHOOK`. If verified present, it posts the full `OrderPayload` JSON to that URL in the background.
