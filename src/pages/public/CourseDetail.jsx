import { useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { courses } from "../../data/siteData";
import { useAuth } from "../../context/AuthContext";
import Icon from "../../components/ui/Icons";
import Button from "../../components/ui/Button";

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const { currentUser, profile } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  if (!course) return <Navigate to="/academy" replace />;

  async function handleEnroll() {
    if (!currentUser) {
      navigate(`/signup?redirect=/academy/${course.id}`);
      return;
    }
    setStatus("sending");
    try {
      await addDoc(collection(db, "enrollments"), {
        userId: currentUser.uid,
        userName: profile?.name || currentUser.displayName,
        userEmail: currentUser.email,
        courseId: course.id,
        courseTitle: course.title,
        paymentStatus: "pending",
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div>
      <section className="brand-gradient-bg text-white py-16 sm:py-20">
        <div className="container-app">
          <Link to="/academy" className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1 mb-6">
            &larr; All Courses
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-200">{course.category}</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mt-3 mb-4">{course.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <span>&#128337; {course.duration}</span>
            <span>&#128218; {course.level}</span>
            <span className="font-semibold text-white">{course.price}</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-app grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-bold text-navy-900 mb-4">About This Course</h2>
            <p className="text-navy-600 leading-relaxed mb-10">{course.description}</p>

            <h2 className="text-2xl font-display font-bold text-navy-900 mb-5">What You'll Get</h2>
            <ul className="space-y-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-3 bg-surface rounded-xl p-4">
                  <Icon name="check" className="w-5 h-5 text-brand-500 shrink-0" />
                  <span className="text-sm text-navy-800 font-medium">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="sticky top-24 bg-white border border-surface-alt rounded-3xl p-7 shadow-lg text-center">
              <p className="text-3xl font-bold font-display text-navy-900 mb-1">{course.price}</p>
              <p className="text-sm text-navy-600 mb-6">One-time payment, lifetime access</p>

              {status === "sent" ? (
                <div className="bg-surface rounded-xl p-6 text-left">
                  <p className="font-semibold text-navy-900 mb-2">Enrollment Submitted!</p>
                  <p className="text-sm text-navy-600 mb-3">
                    Bank details for payment are shown below. After transferring, keep checking
                    your dashboard — access is granted once the admin verifies your payment.
                  </p>
                  <div className="bg-white rounded-lg p-4 text-xs text-navy-700 space-y-1 border border-surface-alt">
                    <p><strong>Bank:</strong> [Your Bank Name]</p>
                    <p><strong>Account Title:</strong> RiseDigital Solutions</p>
                    <p><strong>Account No:</strong> [XXXX-XXXX-XXXX]</p>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleEnroll}
                    variant="gradient"
                    className="w-full mb-3"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Processing..." : currentUser ? "Enroll Now" : "Login to Enroll"}
                  </Button>
                  <p className="text-xs text-navy-500">
                    {currentUser
                      ? "You'll receive payment instructions after enrolling."
                      : "You need an account to enroll — free signup."}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
