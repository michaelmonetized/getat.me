import { PricingTable } from "@clerk/nextjs";

const PricingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Pricing</h1>
      <p className="text-sm text-muted-foreground">
        Explore our pricing plans.
      </p>
      <PricingTable />
    </div>
  );
};

export default PricingPage;
