const plans = {
  premium: {
    id: "cplan_34pOGvuXdApGqi7sL9jOGmt0NUu",
    name: "Premium",
    price: {
      annual: "$3.99/mo",
      month: "$4.99/mo",
    },
  },
  pro: {
    id: "cplan_34mvyFU9PuD9UMnKRtBd8SKF8Lf",
    name: "Pro",
    price: {
      annual: "$7.99/mo",
      month: "$9.99/mo",
    },
  },
  promax: {
    id: "cplan_34mwfWNyDG0w7w1feCVi4tmm6y9",
    name: "ProMax",
    price: {
      annual: "$14.99/mo",
      month: "$19.99/mo",
    },
  },
} as const;

export default plans;
