import { UserProfile } from "@clerk/nextjs";

const ManageAccountPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Manage Account</h1>
      <UserProfile />
    </div>
  );
};

export default ManageAccountPage;
