import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Button } from "@/components/ui/button";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const buttonOnclickHandler = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("accessKey");
    window.location.href = "/";
  }
}

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList() || {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/arogyalogo.png"
                height={40}
                width={40}
                alt="Arogya Logo"
                className="h-10 w-10"
              />
              <h1 className="text-xl font-semibold">Arogya Admin</h1>
            </div>
            
            
          </div>
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome Admin</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        
        <DataTable columns={columns} data={appointments.documents} />
        <AdminLogoutButton />
        
      </main>
      
    </div>
  );
};

export default AdminPage;