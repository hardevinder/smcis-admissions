"use client";

import Image from "next/image";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Swal from "sweetalert2";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  UsersRound,
  UserRound,
} from "lucide-react";

type EnquiryForm = {
  student_name: string;
  parent_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  class_interested: string;
  dob: string;
  gender: string;
  previous_school: string;
  remarks: string;
};

type EnquiryFormKey = keyof EnquiryForm;

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://api-smcis.edubridgeerp.in"
).replace(/\/$/, "");

const initialForm: EnquiryForm = {
  student_name: "",
  parent_name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  class_interested: "",
  dob: "",
  gender: "",
  previous_school: "",
  remarks: "",
};

const classOptions = [
  "Play Group",
  "Nursery",
  "LKG",
  "UKG",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#1f276f] focus:ring-4 focus:ring-[#1f276f]/10";

export default function EnquiryPage() {
  const [formData, setFormData] = useState<EnquiryForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = event.target.name as EnquiryFormKey;
    const value = event.target.value;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));

    if (name === "phone") {
      setPhoneError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const digitsOnly = formData.phone.replace(/\D/g, "");

    if (!formData.student_name.trim()) {
      await Swal.fire("Student Name Required", "Please enter the student name.", "warning");
      return;
    }

    if (!formData.parent_name.trim()) {
      await Swal.fire("Parent Name Required", "Please enter parent / guardian name.", "warning");
      return;
    }

    if (digitsOnly.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      await Swal.fire(
        "Invalid Phone",
        "Phone number must be exactly 10 digits. Example: 9876543210",
        "error"
      );
      return;
    }

    if (!formData.class_interested) {
      await Swal.fire("Class Required", "Please select admission class.", "warning");
      return;
    }

    setIsSubmitting(true);

    const parentName = formData.parent_name.trim();
    const payload = {
      student_name: formData.student_name.trim(),
      parent_name: parentName,
      parents_name: parentName,
      father_name: parentName,
      mother_name: "",
      phone: `+91${digitsOnly}`,
      email: formData.email.trim(),
      city: formData.city.trim(),
      address: formData.address.trim() || formData.city.trim(),
      class_interested: formData.class_interested,
      dob: formData.dob,
      gender: formData.gender,
      previous_school: formData.previous_school.trim(),
      remarks: formData.remarks.trim(),
      source: "SMCIS Admission Form",
      session: "2026-27",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let message = "Something went wrong. Please try again.";

        if (response.status === 400 || response.status === 422) {
          message =
            data?.message ||
            "Some form fields seem invalid. Please check the details and try again.";
        } else if (response.status >= 500) {
          message =
            "Server error while saving your enquiry. Please try again after some time.";
        } else if (data?.message) {
          message = data.message;
        }

        await Swal.fire("Error", message, "error");
        return;
      }

      await Swal.fire(
        "Thank You!",
        "Your admission enquiry has been submitted successfully. The school team will contact you soon.",
        "success"
      );

      setFormData(initialForm);
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      await Swal.fire(
        "Unable to Connect",
        "Please check your internet connection and try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7f2] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fff7e3_0%,#f5f7f2_34%,#eef7f1_62%,#edf2ff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(#1f276f_1px,transparent_1px),linear-gradient(90deg,#1f276f_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-2 bg-gradient-to-r from-[#1f276f] via-[#0f6b43] to-[#ffb22d]" />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-lg border border-white/80 bg-white/90 px-4 py-4 shadow-xl shadow-slate-900/5 backdrop-blur sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#ffb22d]/35 bg-white p-1 shadow-md">
                <Image src="/images/smcis/logo.png" alt="SMCIS Logo" width={64} height={64} className="h-full w-full object-contain" priority />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1f276f]">SMCIS</p>
                <h1 className="mt-1 text-lg font-black text-slate-950 sm:text-2xl">
                  Seth Malook Chand International School
                </h1>
                <p className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                  Admission Form for Session 2026-27
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-center shadow-sm sm:min-w-80">
              {[
                ["CBSE", "Affiliated"],
                ["2026-27", "Session"],
                ["Sasni", "Campus"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-slate-200 px-3 py-2 last:border-r-0">
                  <p className="text-sm font-black text-[#1f276f]">{value}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-lg border border-white/70 bg-[#1f276f] text-white shadow-2xl shadow-[#1f276f]/20">
              <div className="relative h-72 overflow-hidden">
                <Image src="/images/smcis/primary.webp" alt="SMCIS admission enquiry" fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11164b] via-[#11164b]/45 to-transparent" />
                <div className="absolute left-5 top-5 flex h-20 w-20 items-center justify-center rounded-lg border border-white/60 bg-white/90 p-2 shadow-xl">
                  <Image src="/images/smcis/logo.png" alt="SMCIS Logo" width={80} height={80} className="h-full w-full object-contain" />
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
                    <Sparkles className="h-4 w-4 text-[#ffb22d]" /> Admissions Open
                  </div>
                  <h2 className="text-3xl font-black leading-tight">Begin your child&apos;s SMCIS journey</h2>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <p className="text-sm leading-7 text-blue-100">
                  Share parent and student details with the admissions team for class availability, fee guidance and next steps.
                </p>

                <div className="grid gap-3">
                  {[
                    { icon: GraduationCap, label: "CBSE affiliated learning environment" },
                    { icon: ShieldCheck, label: "Safe, caring and value-driven campus" },
                    { icon: CalendarCheck2, label: "Admissions open for 2026-27" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-lg bg-white/10 p-3 ring-1 ring-white/10">
                        <Icon className="h-5 w-5 text-[#ffb22d]" />
                        <span className="text-sm font-bold text-blue-50">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10">
                  <div className="flex items-center gap-3 text-sm font-bold text-blue-50"><Phone className="h-4 w-4 text-[#ffb22d]" /> 7055000524 / 7055000525</div>
                  <div className="mt-3 flex items-center gap-3 text-sm font-bold text-blue-50"><Mail className="h-4 w-4 text-[#ffb22d]" /> admissions@smcis.in</div>
                  <div className="mt-3 flex items-start gap-3 text-sm font-bold text-blue-50"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb22d]" /> OPP. Manglayatan Mandir, Aligarh-Agra Road, Sasni (U.P.) - 204216</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-lg border border-white/80 bg-white/95 p-4 shadow-2xl shadow-[#1f276f]/10 backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0f6b43]">Admission Enquiry Form</p>
                <h2 className="mt-2 text-2xl font-black text-[#1f276f] sm:text-4xl">Parent & Student Details</h2>
                <p className="mt-2 text-sm font-medium text-slate-600">Fields marked with <span className="text-red-500">*</span> are required.</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#fff7e3] px-4 py-3 text-sm font-black text-[#1f276f] ring-1 ring-[#ffb22d]/25">
                <ClipboardCheck className="h-5 w-5 text-[#0f6b43]" /> Secure Admission Record
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <section>
                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#1f276f]">
                  <UserRound className="h-4 w-4" /> Basic Details
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Student Name <span className="text-red-500">*</span></label>
                    <input name="student_name" value={formData.student_name} onChange={handleChange} className={inputClass} placeholder="Enter student name" />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Parent / Guardian Name <span className="text-red-500">*</span></label>
                    <input name="parent_name" value={formData.parent_name} onChange={handleChange} className={inputClass} placeholder="Enter parent name" />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Parent Phone No. <span className="text-red-500">*</span></label>
                    <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition focus-within:border-[#1f276f] focus-within:ring-4 focus-within:ring-[#1f276f]/10">
                      <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-500">+91</span>
                      <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400" placeholder="9876543210" inputMode="numeric" />
                    </div>
                    {phoneError ? <p className="mt-1.5 text-xs font-bold text-red-500">{phoneError}</p> : null}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="parent@example.com" />
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#1f276f]">
                  <GraduationCap className="h-4 w-4" /> Admission Details
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Admission into Grade <span className="text-red-500">*</span></label>
                    <select name="class_interested" value={formData.class_interested} onChange={handleChange} className={inputClass}>
                      <option value="">Select class</option>
                      {classOptions.map((className) => <option key={className} value={className}>{className}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Previous School</label>
                    <input name="previous_school" value={formData.previous_school} onChange={handleChange} className={inputClass} placeholder="Previous school name" />
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#1f276f]">
                  <MapPin className="h-4 w-4" /> Address Details
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="City / Village" />
                  </div>
                  <div className="md:row-span-2">
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Remarks</label>
                    <textarea name="remarks" value={formData.remarks} onChange={handleChange} className={`${inputClass} min-h-28 resize-none`} placeholder="Any message for admission team" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">Full Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="House no., area, city" />
                  </div>
                </div>
              </section>

              <div className="rounded-lg border border-[#ffb22d]/35 bg-[#fff7e3] p-4 text-sm font-semibold leading-6 text-amber-950">
                SMCIS maintains strict confidentiality of submitted data and uses it only for admission-related communication.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#1f276f] via-[#17215e] to-[#0f6b43] px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-2xl shadow-[#1f276f]/25 transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Submitting Enquiry..." : "Submit Admission Enquiry"}
                <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: School, label: "Seth Malook Chand International School" },
            { icon: UsersRound, label: "Personal guidance from admission team" },
            { icon: CheckCircle2, label: "Mobile-friendly admission form" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/70 bg-white/80 p-4 text-sm font-black text-[#1f276f] shadow-lg shadow-[#1f276f]/5 backdrop-blur">
                <Icon className="h-5 w-5 text-[#0f6b43]" /> {item.label}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
