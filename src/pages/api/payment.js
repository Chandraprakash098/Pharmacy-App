// backend/pages/api/payment.js
import gateway from "../../utils/braintree";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await gateway.clientToken.generate({});
      res.status(200).json({ clientToken: response.clientToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    const { paymentMethodNonce, amount } = req.body;

    try {
      const result = await gateway.transaction.sale({
        amount,
        paymentMethodNonce,
        options: {
          submitForSettlement: true,
        },
      });

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
