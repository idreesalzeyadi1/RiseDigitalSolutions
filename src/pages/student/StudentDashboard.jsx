import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Icon from "../../components/ui/Icons";

const links = [
  { to: "/student/dashboard", label: "My Courses", icon: "book", end: true },
];

const statusStyle = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-emerald-100 text-emerald-700",
};

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "enrollments"), where("userId", "==", currentUser.uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setEnrollments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, [currentUser]);

  return (
    <DashboardLayout title="My Courses" links={links}>
      {loading ? (
        <p className="text-navy-500 text-sm">Loading...</p>
      ) : enrollments.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-surface-alt">
          <Icon name="book" className="w-10 h-10 text-navy-300 mx-auto mb-4" />
          <p className="font-semibold text-navy-900 mb-1">You haven't enrolled in any course yet</p>
          <p className="text-sm text-navy-600 mb-5">Browse the Academy and choose your first course.</p>
          <a href="/academy" className="text-brand-500 font-semibold text-sm">Browse Courses &rarr;</a>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {enrollments.map((en) => (
            <div key={en.id} className="bg-white rounded-2xl p-6 border border-surface-alt">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-semibold text-navy-900">{en.courseTitle}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[en.paymentStatus] || "bg-surface"}`}>
                  {en.paymentStatus}
                </span>
              </div>
              <p className="text-sm text-navy-600">
                {en.paymentStatus === "pending"
                  ? "Waiting for payment verification. The admin will confirm it."
                  : "Payment verified — course access is active."}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
