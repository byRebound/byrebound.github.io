// 1️⃣ Create PaymentIntent
const res = await fetch("/api/create-intent", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: 2000 }), // $20
});
const data = await res.json();
const clientSecret = data.clientSecret;

// 2️⃣ Collect card info using Stripe Elements
const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: { card: cardElement },
});

// 3️⃣ Optionally confirm server-side
const confirmRes = await fetch("/api/confirm-payment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
});
const confirmData = await confirmRes.json();
console.log(confirmData.success ? "Payment succeeded" : "Payment failed");
