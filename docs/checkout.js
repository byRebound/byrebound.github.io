<script src="https://js.stripe.com/v3/"></script>
<script>
  const stripe = Stripe("pk_test_YOUR_PUBLIC_KEY");

  document.querySelector("#checkout").addEventListener("click", async () => {
    const response = await fetch("https://your-serverless-function-url.com/api/create-checkout-session", {
      method: "POST",
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  });
</script>

