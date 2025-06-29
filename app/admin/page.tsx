import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList() || {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 md:px-12 lg:px-24">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 border-b border-gray-800 pb-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/icons/arogyalogo.png"
            height={48}
            width={48}
            alt="Arogya Logo"
            className="rounded-lg"
          />
          <h1 className="text-2xl font-bold text-teal-400">Arogya Admin</h1>
        </Link>
        <p className="mt-4 md:mt-0 text-lg font-medium text-gray-400">Admin Dashboard</p>
      </header>

      

      {/* STAT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard
          type="appointments"
          count={appointments.scheduledCount}
          label="Scheduled Appointments"
          icon="/assets/icons/appointments.svg"
        />
        <StatCard
          type="pending"
          count={appointments.pendingCount}
          label="Pending Appointments"
          icon="/assets/icons/pending.svg"
        />
        <StatCard
          type="cancelled"
          count={appointments.cancelledCount}
          label="Cancelled Appointments"
          icon="/assets/icons/cancelled.svg"
        />
      </section>

      {/* TABLE SECTION */}
      <section className="bg-gray-900 rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Appointments</h3>
        <DataTable columns={columns} data={appointments.documents} />
      </section>

      {/* LOGOUT */}
      <div className="flex justify-end">
        <AdminLogoutButton />
      </div>
    </div>
  );
};

export default AdminPage;
