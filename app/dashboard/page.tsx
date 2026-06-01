import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/logout-button";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-300 justify-between items-center">
      <Navbar />
      <main className="mb-auto p-4">
        <h1 className="font-bold bg-base-100 rounded-box p-4">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <LogoutButton />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
