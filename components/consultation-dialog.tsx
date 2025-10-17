"use client";

import { useState } from "react";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ConsultationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationDialog({ isOpen, onClose }: ConsultationDialogProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('http://localhost:5000/api/free-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus("success");
      
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", service: "" });
        setSubmitStatus("idle");
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error sending consultation request:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/50 backdrop-blur-sm animate__animated animate__fadeIn animate__faster"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl",
          "animate__animated animate__zoomIn animate__faster"
        )}
        onClick={(e) => e.stopPropagation()}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute z-20 p-1.5 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-lg",
            "top-3 sm:top-4",
            language === "ar" ? "left-3 sm:left-4" : "right-3 sm:right-4"
          )}
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6 sm:p-8 pt-16 sm:pt-12 md:pt-8">
            <div className="text-center text-white space-y-3 sm:space-y-4">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Send className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold px-2">{t.freeConsultation.dialog.title}</h3>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 pt-6 sm:pt-6 md:pt-8">
            {/* Subtitle moved here */}
            <div className="mb-4 sm:mb-6 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {t.freeConsultation.dialog.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t.freeConsultation.dialog.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t.freeConsultation.dialog.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t.freeConsultation.dialog.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
              </div>

              {/* Service Input */}
              <div>
                <label htmlFor="service" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  {t.freeConsultation.dialog.form.message}
                </label>
                <textarea
                  id="service"
                  name="service"
                  required
                  rows={3}
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg animate__animated animate__fadeIn">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{t.freeConsultation.dialog.success}</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 p-2.5 sm:p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg animate__animated animate__fadeIn">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{t.freeConsultation.dialog.error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-white text-sm sm:text-base",
                  "bg-gradient-to-r from-blue-500 to-purple-600",
                  "hover:from-blue-600 hover:to-purple-700",
                  "transition-all duration-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.freeConsultation.dialog.form.sending}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.freeConsultation.dialog.form.submit}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}