"use client";

import Image from "next/image";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Swal from "sweetalert2";
import {
  ArrowRight,
  CalendarCheck2,
  ClipboardCheck,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
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

const SESSION_LABEL = "2026-27";

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
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1f276f] focus:ring-4 focus:ring-[#1f276f]/10";

const labelClass =
  "mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-slate-600";

const sectionTitleClass =
  "mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#1f276f]";

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

    if (isSubmitting) return;

    const digitsOnly = formData.phone.replace(/\D/g, "");
    const email = formData.email.trim();

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

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await Swal.fire("Invalid Email", "Please enter a valid email address.", "warning");
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
      email,
      city: formData.city.trim(),
      address: formData.address.trim() || formData.city.trim(),
      class_interested: formData.class_interested,
      dob: formData.dob,
      gender: formData.gender,
      previous_school: formData.previous_school.trim(),
      remarks: formData.remarks.trim(),
      source: "SMCIS Admission Form",
      session: SESSION_LABEL,
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
      setPhoneError("");
    } catch {
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
    <main className="relative min-h-screen overflow-hidden bg-[#f6f7f2] text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#fff1c8_0,transparent_34%),radial-gradient(circle_at_top_right,#dff6ea_0,transparent_32%),linear-gradient(135deg,#fffaf0_0%,#f6f7f2_45%,#eef4ff_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.055] [background-image:linear-gradient(#1f276f_1px,transparent_1px),linear-gradient(90deg,#1f276f_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute inset-x-0 top-0 z-0 h-1.5 bg-gradient-to-r from-[#1f276f] via-[#0f6b43] to-[#ffb22d]" />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-3xl border border-white/80 bg-white/90 px-4 py-4 shadow-xl shadow-slate-900/5 backdrop-blur sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#ffb22d]/35 bg-white p-1.5 shadow-md sm:h-20 sm:w-20">
                <Image
                  src="/images/smcis/logo.png"
                  alt="Seth Malook Chand International School logo"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                  priority
                />
              </span>

              <div className="leading-tight">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0f6b43]">
                  Admissions Open
                </p>
                <h1 className="mt-1 text-xl font-black text-[#1f276f] sm:text-3xl">
                  Seth Malook Chand International School
                </h1>
                <p className="mt-1 text-sm font-bold text-slate-500">
                  Admission Enquiry for Session {SESSION_LABEL}
                </p>
              </div>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-center shadow-sm sm:grid-cols-3 lg:min-w-[360px]">
              {[
                ["CBSE", "Affiliated"],
                [SESSION_LABEL, "Session"],
                ["Sasni", "Campus"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="border-b border-slate-200 px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <p className="text-base font-black text-[#1f276f]">{value}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-3xl border border-white/70 bg-[#1f276f] text-white shadow-2xl shadow-[#1f276f]/20">
              <div className="relative h-[360px] overflow-hidden sm:h-[430px] lg:h-[520px]">
                <Image
                  src="/images/smcis/primary.webp"
                  alt="SMCIS campus and students"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11164b] via-[#11164b]/55 to-[#11164b]/10" />

                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#ffb22d]" />
                  Admissions {SESSION_LABEL}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <h2 className="max-w-md text-3xl font-black leading-tight sm:text-5xl">
                    Begin your child&apos;s SMCIS journey
                  </h2>
                  <p className="mt-4 max-w-md text-sm font-medium leading-7 text-blue-50 sm:text-base">
                    Submit the enquiry form and the admissions team will guide you with class availability,
                    fee details and next steps.
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <div className="grid gap-3">
                  {[
                    { icon: GraduationCap, label: "CBSE affiliated learning environment" },
                    { icon: ShieldCheck, label: "Safe, caring and value-driven campus" },
                    { icon: CalendarCheck2, label: "Admissions open for session 2026-27" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/10"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-[#ffb22d]" />
                        <span className="text-sm font-bold text-blue-50">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <a
                    href="tel:+917055000524"
                    className="flex items-center gap-3 text-sm font-bold text-blue-50 transition hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[#ffb22d]" />
                    7055000524 / 7055000525
                  </a>

                  <a
                    href="mailto:admissions@smcis.in"
                    className="mt-3 flex items-center gap-3 text-sm font-bold text-blue-50 transition hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#ffb22d]" />
                    admissions@smcis.in
                  </a>

                  <div className="mt-3 flex items-start gap-3 text-sm font-bold leading-6 text-blue-50">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb22d]" />
                    OPP. Manglayatan Mandir, Aligarh-Agra Road, Sasni (U.P.) - 204216
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-3xl border border-white/80 bg-white/95 p-4 shadow-2xl shadow-[#1f276f]/10 backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="mb-7 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0f6b43]">
                  Admission Enquiry Form
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#1f276f] sm:text-4xl">
                  Parent & Student Details
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Please fill the required details carefully. Fields marked with{" "}
                  <span className="text-red-500">*</span> are mandatory.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl bg-[#fff7e3] px-4 py-3 text-sm font-black text-[#1f276f] ring-1 ring-[#ffb22d]/25">
                <ClipboardCheck className="h-5 w-5 text-[#0f6b43]" />
                Secure Admission Record
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <div className={sectionTitleClass}>
                  <UserRound className="h-4 w-4" />
                  Basic Details
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="student_name" className={labelClass}>
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="student_name"
                      name="student_name"
                      value={formData.student_name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Enter student name"
                      autoComplete="name"
                      maxLength={80}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="parent_name" className={labelClass}>
                      Parent / Guardian Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="parent_name"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Enter parent name"
                      autoComplete="name"
                      maxLength={80}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Parent Phone No. <span className="text-red-500">*</span>
                    </label>
                    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 focus-within:border-[#1f276f] focus-within:ring-4 focus-within:ring-[#1f276f]/10">
                      <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-500">
                        +91
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                        placeholder="9876543210"
                        inputMode="numeric"
                        autoComplete="tel"
                        aria-invalid={Boolean(phoneError)}
                        maxLength={10}
                        required
                      />
                    </div>
                    {phoneError ? (
                      <p className="mt-2 text-xs font-bold text-red-500">{phoneError}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="parent@example.com"
                      autoComplete="email"
                      maxLength={100}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                <div className={sectionTitleClass}>
                  <GraduationCap className="h-4 w-4" />
                  Admission Details
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="class_interested" className={labelClass}>
                      Admission into Grade <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="class_interested"
                      name="class_interested"
                      value={formData.class_interested}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Select class</option>
                      {classOptions.map((className) => (
                        <option key={className} value={className}>
                          {className}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gender" className={labelClass}>
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dob" className={labelClass}>
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="previous_school" className={labelClass}>
                      Previous School
                    </label>
                    <input
                      id="previous_school"
                      name="previous_school"
                      value={formData.previous_school}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Previous school name"
                      maxLength={120}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <div className={sectionTitleClass}>
                  <MapPin className="h-4 w-4" />
                  Address Details
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="city" className={labelClass}>
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="City / Village"
                      autoComplete="address-level2"
                      maxLength={80}
                    />
                  </div>

                  <div className="md:row-span-2">
                    <label htmlFor="remarks" className={labelClass}>
                      Remarks
                    </label>
                    <textarea
                      id="remarks"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      className={`${inputClass} min-h-32 resize-none leading-6`}
                      placeholder="Any message for admission team"
                      maxLength={500}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className={labelClass}>
                      Full Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="House no., area, city"
                      autoComplete="street-address"
                      maxLength={160}
                    />
                  </div>
                </div>
              </section>

              <div className="rounded-2xl border border-[#ffb22d]/35 bg-[#fff7e3] p-4 text-sm font-semibold leading-6 text-amber-950">
                SMCIS maintains confidentiality of submitted data and uses it only for
                admission-related communication.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="group inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#1f276f] via-[#17215e] to-[#0f6b43] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-2xl shadow-[#1f276f]/25 transition hover:-translate-y-0.5 hover:shadow-[#1f276f]/35 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Submitting Enquiry..." : "Submit Admission Enquiry"}
                <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}