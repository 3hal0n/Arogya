"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAppointment } from "@/lib/actions/appointment.actions";

const AppointmentsPage = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointment(params.userId);
        if (data) {
          setAppointments(data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [params.userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-dark-100 p-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dark-900">My Appointments</h1>
              <p className="text-dark-700">View and manage your scheduled appointments.</p>
            </div>
            <button
              onClick={() => router.push(`/patients/${params.userId}/new-appointment`)}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Schedule New Appointment
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-dark-900 mb-2">No Appointments Yet</h3>
              <p className="text-dark-700 mb-6">You haven't scheduled any appointments yet.</p>
              <button
                onClick={() => router.push(`/patients/${params.userId}/new-appointment`)}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Schedule Your Appointment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.$id}
                  className="flex items-center justify-between rounded-lg border border-dark-200 p-6 hover:bg-dark-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-dark-900">
                          Dr. {appointment.primaryPhysician}
                        </h3>
                        <p className="text-dark-700">{appointment.reason}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-dark-600">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(appointment.schedule).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong>{" "}
                        {new Date(appointment.schedule).toLocaleTimeString()}
                      </p>
                      {appointment.note && (
                        <p>
                          <strong>Notes:</strong> {appointment.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage; 