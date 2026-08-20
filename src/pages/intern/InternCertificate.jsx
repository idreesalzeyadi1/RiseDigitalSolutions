import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { internLinks } from "./InternDashboard";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";

export default function InternCertificate() {
  const { currentUser } = useAuth();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "certificates"), where("internId", "==", currentUser.uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setCertificate(snap.docs[0] ? { id: snap.docs[0].id, ...snap.docs[0].data() } : null);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, [currentUser]);

  return (
    <DashboardLayout title="Certificate" links={internLinks}>
      {loading ? (
        <p className="text-sm text-navy-500">Loading...</p>
      ) : certificate ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-surface-alt max-w-md">
          <span className="w-16 h-16 rounded-full brand-gradient-bg text-white flex items-center justify-center mx-auto mb-5">
            <Icon name="award" className="w-8 h-8" />
          </span>
          <h3 className="font-display font-bold text-xl text-navy-900 mb-2">Congratulations!</h3>
          <p className="text-sm text-navy-600 mb-6">
            Your internship certificate is ready. Download it below.
          </p>
          <Button as="a" href={certificate.pdfUrl} target="_blank" rel="noreferrer" variant="gradient" className="w-full">
            <Icon name="download" className="w-4 h-4" /> Download Certificate
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center border border-surface-alt max-w-md">
          <Icon name="award" className="w-10 h-10 text-navy-300 mx-auto mb-4" />
          <p className="font-semibold text-navy-900 mb-1">Certificate not issued yet</p>
          <p className="text-sm text-navy-600">
            Once your internship is complete, the admin will upload your certificate — it will
            show up here automatically.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
